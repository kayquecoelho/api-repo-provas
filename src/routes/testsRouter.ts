import { Router } from "express";
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";
import * as testController from "../controllers/testsController.js";

const testRouter = Router();

testRouter.use(validateTokenMiddleware);
testRouter.put("/:id/view", testController.increaseViewsCount);
testRouter.get("/", testController.getTests);

export default testRouter;