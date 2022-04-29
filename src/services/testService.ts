import testRepository, { CreateTestData } from "../repositories/testRepository.js";
import * as errors from "../errors/errors.js";
import teacherRepository from "../repositories/teacherRepository.js";
import termRepository from "../repositories/termRepository.js";
import { TestData } from "../schemas/testSchema.js";
import disciplineTeacherRepository from "../repositories/disciplineTeacherRepository.js";
import categoryRepository from "../repositories/categoryRepository.js";

async function increaseViewsCount(testId: number) {
  const test = await testRepository.findById(testId);

  if (!test) throw errors.notFound("Test");

  await testRepository.increaseViewsCount(test.id);
}

async function getFilteredTests(groupedBy: "teachers" | "terms") {
  let tests;
  if (groupedBy === "teachers") {
    tests = await teacherRepository.findAll();
  } else if (groupedBy === "terms") {
    tests = await termRepository.findAll();
  }
  return tests;
}

async function createTest(testData: TestData) {
  const disciplineTeacherId = await ensureDisciplineAndTeacherAreValid(testData);
  
  await ensureCategoryIsValid(testData.categoryId);

  const createTestData: CreateTestData = {
    disciplineTeacherId,
    name: testData.name,
    pdfUrl: testData.pdfUrl,
    categoryId: testData.categoryId,
  }

  await testRepository.create(createTestData);
}

async function ensureCategoryIsValid(categoryId: number) {
  const category = await categoryRepository.findById(categoryId);

  if (!category)
  throw errors.badRequest("Data provided is invalid");
}

async function ensureDisciplineAndTeacherAreValid(testData: TestData) {
  const disciplineTeacherId = await disciplineTeacherRepository.getIdByDisciplineAndTeacher(
    testData.disciplineId,
    testData.teacherId
    );
    
  if (!disciplineTeacherId)
  throw errors.badRequest("Data Provided is invalid");
  return disciplineTeacherId;
}

export default { getFilteredTests, increaseViewsCount, createTest };