import { config } from "dotenv";
import type { Resource, SolanaAddress } from "x402-express";

config();

export const CONFIG = {
  port: 4021,
  facilitatorUrl: "https://facilitator.payai.network" as Resource,
  payTo: "9HdYo83E9UDESakfakUH6FXvd5GkAvCNLMyxRjnQ7ngo" as SolanaAddress,
  network: "solana-devnet" as const,
} as const;

export const PAYMENT_CONFIG = {
  "POST /v1/chat/completions": {
    price: {
      amount: "10000000",
      asset: {
        address: "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr",
        decimals: 6,
      },
    },
    network: CONFIG.network,
  },
  "POST /v1/chat/gpt": {
    price: {
      amount: "10000000",
      asset: {
        address: "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr",
        decimals: 6,
      },
    },
    network: CONFIG.network,
  },
  "POST /v1/chat/claude": {
    price: {
      amount: "20000000",
      asset: {
        address: "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr",
        decimals: 6,
      },
    },
    network: CONFIG.network,
  },
  "POST /v1/chat/deepseek": {
    price: {
      amount: "10000000",
      asset: {
        address: "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr",
        decimals: 6,
      },
    },
    network: CONFIG.network,
  },
} as const;

