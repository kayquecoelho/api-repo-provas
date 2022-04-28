import { Router } from "express";
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";
import * as testController from "../controllers/testsController.js";

const testRouter = Router();

testRouter.put("/:id/view", validateTokenMiddleware, testController.increaseViewsCount);

export default testRouter;