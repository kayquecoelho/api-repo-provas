import { Request, Response } from "express";

import * as authController from "../services/authService.js";

export async function signUp(req: Request, res: Response) {  
  await authController.createUser(req.body);

  res.sendStatus(201);
}

export async function login(req: Request, res: Response) {

  res.sendStatus(201);
}