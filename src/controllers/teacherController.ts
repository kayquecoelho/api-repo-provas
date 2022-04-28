import { Response, Request } from "express";
import teacherService from "../services/teacherService.js";

async function getTeachers(req: Request, res: Response) {
  const disciplineId = Number(req.query.disciplineId);

  if (isNaN(disciplineId) || disciplineId < 0) {
    return res.sendStatus(400);
  }

  const teachers = await teacherService.getTeachersByDiscipline(disciplineId);

  res.send(teachers);
}

export default { getTeachers };
