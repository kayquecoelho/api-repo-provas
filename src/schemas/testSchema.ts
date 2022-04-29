import Joi from "joi";

export interface TestData {
  name: string;
  pdfUrl: string;
  disciplineId: number
  teacherId: number
  categoryId: number
}

const testSchema = Joi.object<TestData>({
  name: Joi.string().required(),
  pdfUrl: Joi.string().uri().required(),
  disciplineId: Joi.number().positive().integer().required(),
  teacherId: Joi.number().positive().integer().required(),
  categoryId: Joi.number().positive().integer().required(),
});

export default testSchema;