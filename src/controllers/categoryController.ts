import { Request, Response } from "express";
import categoryService from "../services/categoryService.js";

export default async function getCategories(req: Request, res: Response) {
  const categories = await categoryService.getCategories();

  res.send(categories);
}
