import { Request, Response } from "express";
import * as teacherService from "../services/teacherService.js";

export async function getTeachers(req: Request, res: Response) {
  const teachers = await teacherService.getTeachers();

  res.send(teachers);
}