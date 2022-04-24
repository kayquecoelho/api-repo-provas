import { Request, Response } from "express";

import * as authController from "../services/authService.js";
import { connection } from "../connection.js";

export async function signUp(req: Request, res: Response) {
  await authController.createUser(req.body);

  res.sendStatus(201);
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const token = await authController.login(email, password);

  res.send({ token });
}