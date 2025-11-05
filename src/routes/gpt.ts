import { Router } from "express";
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import type { ChatCompletionRequest } from "../types";
import { createChatResponse } from "../utils/response";

const router = Router();

router.post("/v1/chat/gpt", async (req, res) => {
  try {
    const { model = "gpt-4o-mini", messages, stream = false, ...options } = req.body as ChatCompletionRequest;

    if (!messages) {
      return res.status(400).json({ error: "Missing required field: messages" });
    }

    const result = streamText({
      model: openai(model),
      messages,
      ...options,
    });

    const fullText = await result.text;
    const usage = await result.usage;

    res.json(createChatResponse(model, "openai", fullText, usage));
  } catch (error: any) {
    console.error("GPT error:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

export default router;

