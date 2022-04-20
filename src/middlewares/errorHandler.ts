import { NextFunction, Request, Response } from "express";
import { CustomizedError } from "../errors/errors.js";

export default function errorHandler(
  error: Error | CustomizedError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if ("type" in error) {
    if (error.type === "error_unauthorized") {
      return res.status(401).send(error.message);
    }
    if (error.type === "error_not_found") {
      return res.status(404).send(error.message);
    }
    if (error.type === "error_conflict") {
      return res.status(409).send(error.message);
    }
    if (error.type === "error_unprocessable_entity") {
      return res.status(422).send(error.message);
    }
  }
  
  console.log(error);
  res.sendStatus(500);
}
