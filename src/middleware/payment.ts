import { paymentMiddleware } from "x402-express";
import { CONFIG, PAYMENT_CONFIG } from "../config";

export const payment = paymentMiddleware(CONFIG.payTo, PAYMENT_CONFIG, {
  url: CONFIG.facilitatorUrl,
});

