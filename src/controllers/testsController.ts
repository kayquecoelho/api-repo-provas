import { Response, Request } from "express";
import * as testService from "../services/testService.js";

export async function increaseViewsCount(req: Request, res: Response) {
  const testId = Number(req.params.id);

  if (!testId) return res.sendStatus(400);

  await testService.increaseViewsCount(testId);
  
  res.sendStatus(200);
}