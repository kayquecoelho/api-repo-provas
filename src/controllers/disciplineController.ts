import { Response, Request } from "express";
import disciplineService from "../services/disciplineService.js";

export default async function getDisciplines(req: Request, res: Response) {
  const disciplines = await disciplineService.getDisciplines();
  res.send(disciplines);
}
