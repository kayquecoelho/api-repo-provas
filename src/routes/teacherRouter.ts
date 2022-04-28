import { Router } from "express";
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";
import teacherController from "../controllers/teacherController.js";

const teacherRouter = Router();

teacherRouter.get("/", validateTokenMiddleware, teacherController.getTeachers);

export default teacherRouter;
