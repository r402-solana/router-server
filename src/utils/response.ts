import type { ChatCompletionResponse } from "../types";

export function createChatResponse(
  model: string,
  provider: string,
  content: string,
  usage: {
    inputTokens?: number;
    outputTokens?: number;
    totalTokens?: number;
  },
): ChatCompletionResponse {
  return {
    id: `chatcmpl-${Date.now()}`,
    object: "chat.completion",
    created: Math.floor(Date.now() / 1000),
    model,
    provider,
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content,
        },
        finish_reason: "stop",
      },
    ],
    usage: {
      prompt_tokens: usage.inputTokens ?? 0,
      completion_tokens: usage.outputTokens ?? 0,
      total_tokens: usage.totalTokens ?? 0,
    },
  };
}

