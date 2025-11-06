import { Router } from "express";
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { deepseek } from "@ai-sdk/deepseek";
import type { ChatCompletionRequest } from "../types";
import { createChatResponse } from "../utils/response";

const router = Router();

router.post("/v1/chat/completions", async (req, res) => {
  try {
    const { model, messages, stream = false, ...options } = req.body as ChatCompletionRequest;

    if (!model || !messages) {
      return res.status(400).json({
        error: "Missing required fields: model and messages",
      });
    }

    // Route to appropriate provider based on model prefix
    let provider;
    let modelName = model;

    if (model.startsWith("gpt-") || model.startsWith("openai/")) {
      provider = openai;
      modelName = model.replace("openai/", "");
    } else if (model.startsWith("claude-") || model.startsWith("anthropic/")) {
      provider = anthropic;
      modelName = model.replace("anthropic/", "");
    } else if (model.startsWith("deepseek-") || model.startsWith("deepseek/")) {
      provider = deepseek;
      modelName = model.replace("deepseek/", "");
    } else {
      return res.status(400).json({
        error: `Unknown model: ${model}. Use gpt-*, claude-*, or deepseek-* prefixes`,
      });
    }

    if (stream) {
      // Streaming response
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      const result = streamText({
        model: provider(modelName),
        messages,
        ...options,
      });

      for await (const chunk of result.textStream) {
        res.write(`data: ${JSON.stringify({ content: chunk })}\n\n`);
      }
      res.write("data: [DONE]\n\n");
      res.end();
    } else {
      // Non-streaming response
      const result = await streamText({
        model: provider(modelName),
        messages,
        ...options,
      });

      const fullText = await result.text;
      const usage = await result.usage;

      res.json(createChatResponse(modelName, model.split("-")[0], fullText, usage));
    }
  } catch (error: any) {
    console.error("Chat completion error:", error);
    res.status(500).json({
      error: error.message || "Internal server error",
    });
  }
});

export default router;

