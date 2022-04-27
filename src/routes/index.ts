import { Router } from "express";
import authRouter from "./authRouter.js";
import teacherRouter from "./teacherRouter.js";
import termRouter from "./termRouter.js";
import testRouter from "./testsRouter.js";

const router = Router();

router.use(authRouter);
router.use(termRouter);
router.use(teacherRouter);
router.use(testRouter);

export default router;
