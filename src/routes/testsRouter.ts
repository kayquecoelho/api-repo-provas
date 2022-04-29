import { Router } from "express";
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";
import * as testController from "../controllers/testsController.js";
import validateSchema from "../middlewares/validateSchema.js";
import testSchema from "../schemas/testSchema.js";

const testRouter = Router();

testRouter.use(validateTokenMiddleware);
testRouter.get("/", testController.getTests);
testRouter.post("/", validateSchema(testSchema), testController.createTest);
testRouter.put("/:id/view", testController.increaseViewsCount);

export default testRouter;
