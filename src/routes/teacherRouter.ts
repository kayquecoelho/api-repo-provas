import { Router } from "express";
import * as teacherController from "../controllers/teacherController.js"
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";

const teacherRouter = Router();

teacherRouter.get("/", validateTokenMiddleware, teacherController.getTeachers);

export default teacherRouter;