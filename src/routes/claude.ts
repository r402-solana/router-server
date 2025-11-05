import { Router } from "express";
import { streamText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import type { ChatCompletionRequest } from "../types";
import { createChatResponse } from "../utils/response";

const router = Router();

router.post("/v1/chat/claude", async (req, res) => {
  try {
    const {
      model = "claude-3-5-sonnet-20241022",
      messages,
      stream = false,
      ...options
    } = req.body as ChatCompletionRequest;

    if (!messages) {
      return res.status(400).json({ error: "Missing required field: messages" });
    }

    const result = await streamText({
      model: anthropic(model),
      messages,
      ...options,
    });

    const fullText = await result.text;
    const usage = await result.usage;

    res.json(createChatResponse(model, "anthropic", fullText, usage));
  } catch (error: any) {
    console.error("Claude error:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

export default router;

