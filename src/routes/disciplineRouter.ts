import { Router } from "express";
import getCategories from "../controllers/categoryController.js";
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";

const disciplineRouter = Router();

disciplineRouter.get("/", validateTokenMiddleware, getCategories);

export default disciplineRouter;
