import { Router } from "express";
import * as termController from "../controllers/termsController.js"
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";

const termRouter = Router();

termRouter.get("/terms", validateTokenMiddleware, termController.getTerms);

export default termRouter;