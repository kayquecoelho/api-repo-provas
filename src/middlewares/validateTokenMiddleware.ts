import { NextFunction, Request, Response } from "express";
import * as authService from "../services/authService.js";

export default async function (req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if(!token){
    return res.status(401).send("Token is invalid");
  }

  const session = await authService.validateToken(token);
  
  res.locals.user = session.user;
  
  next();
}