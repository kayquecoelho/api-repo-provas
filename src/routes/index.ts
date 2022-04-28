import { Router } from "express";
import authRouter from "./authRouter.js";
import categoryRouter from "./categoryRouter.js";
import disciplineRouter from "./disciplineRouter.js";
import teacherRouter from "./teacherRouter.js";
import testRouter from "./testsRouter.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/tests", testRouter);
router.use("/categories", categoryRouter);
router.use("/disciplines", disciplineRouter);
router.use("/teachers", teacherRouter);

export default router;
