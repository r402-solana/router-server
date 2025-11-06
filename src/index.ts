import express from "express";
import { CONFIG } from "./config";
import { payment } from "./middleware/payment";
import routes from "./routes";

const app = express();

app.use(express.json());
app.use(payment);
app.use(routes);

app.listen(CONFIG.port, () => {
  console.log(`🚀 AI Router with x402 protection listening at http://localhost:${CONFIG.port}`);
  console.log(`\nAvailable endpoints:`);
  console.log(`  POST /v1/chat/completions - Unified endpoint (auto-routes by model)`);
  console.log(`  POST /v1/chat/gpt - OpenAI GPT models`);
  console.log(`  POST /v1/chat/claude - Anthropic Claude models`);
  console.log(`  POST /v1/chat/deepseek - DeepSeek models`);
});

