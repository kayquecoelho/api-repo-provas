import testRepository from "../repositories/testRepository.js";
import * as errors from "../errors/errors.js";
import teacherRepository from "../repositories/teacherRepository.js";
import termRepository from "../repositories/termRepository.js";

export async function increaseViewsCount(testId: number) {
  const test = await testRepository.findById(testId);

  if (!test) throw errors.notFound("Test");

  await testRepository.increaseViewsCount(test.id);
}

export async function getFilteredTests(groupedBy: "teachers" | "terms") {
  let tests;
  if (groupedBy === "teachers") {
    tests = await teacherRepository.findAll();
  } else if (groupedBy === "terms") {
    tests = await termRepository.findAll();
  }
  return tests;
}
