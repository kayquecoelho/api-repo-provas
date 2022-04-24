import { Router } from "express";
import authRouter from "./authRouter.js";
import termRouter from "./termRouter.js";

const router = Router();

router.use(authRouter);
router.use(termRouter);

export default router;