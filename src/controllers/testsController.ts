import { Response, Request } from "express";
import { TestData } from "../schemas/testSchema.js";
import testService from "../services/testService.js";

export async function increaseViewsCount(req: Request, res: Response) {
  const testId = Number(req.params.id);

  if (!testId || testId < 0) return res.sendStatus(400);

  await testService.increaseViewsCount(testId);
  
  res.sendStatus(200);
}

export async function getTests(req: Request, res: Response) {
  const { groupedBy } = req.query;

  if (groupedBy !== "teachers" && groupedBy !== "terms"){
    return res.sendStatus(422);
  }

  const tests = await testService.getFilteredTests(groupedBy);

  res.send(tests);
}

export async function createTest(req: Request, res: Response) {
  const testData = <TestData>req.body;

  await testService.createTest(testData);

  res.sendStatus(201);
}

