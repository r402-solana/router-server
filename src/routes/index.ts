import { Router } from "express";
import completionsRouter from "./completions";
import gptRouter from "./gpt";
import claudeRouter from "./claude";
import deepseekRouter from "./deepseek";

const router = Router();

router.use(completionsRouter);
router.use(gptRouter);
router.use(claudeRouter);
router.use(deepseekRouter);

export default router;

