import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import * as authController from "../controllers/authController.js"
import authSchema from "../schemas/authSchema.js";

const authRouter = Router();

authRouter.post("/auth/sign-up", validateSchema(authSchema), authController.signUp);
authRouter.post("/auth/login", validateSchema(authSchema), authController.login);

export default authRouter;