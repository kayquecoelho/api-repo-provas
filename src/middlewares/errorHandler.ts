import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { CustomizedError } from "../errors/errors.js";

export default function errorHandler(
  error: Error | CustomizedError | JsonWebTokenError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if ("type" in error) {
    if (error.type === "error_unauthorized") {
      return res.status(401).send(error.message);
    }
    else if (error.type === "error_not_found") {
      return res.status(404).send(error.message);
    }
    else if (error.type === "error_conflict") {
      return res.status(409).send(error.message);
    }
    else if (error.type === "error_unprocessable_entity") {
      return res.status(422).send(error.message);
    }
    else if (error.type === "error_bad_request") {
      return res.status(400).send(error.message);
    }
  } 
  
  else if ("name" in error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).send(error.message);
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(422).send(error.message);
    }
  }
  
  console.log(error);
  res.sendStatus(500);
}
