import { Router } from "express";
import authRouter from "./authRouter.js";
import categoryRouter from "./categoryRouter.js";
import disciplineRouter from "./disciplineRouter.js";
import teacherRouter from "./teacherRouter.js";
import termRouter from "./termRouter.js";
import testRouter from "./testsRouter.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/terms", termRouter);
router.use("/teachers", teacherRouter);
router.use("/tests", testRouter);
router.use("/categories", categoryRouter);
router.use("/disciplines", disciplineRouter);

export default router;
