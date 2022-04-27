import testRepository from "../repositories/testRepository.js";
import * as errors from "../errors/errors.js";

export async function increaseViewsCount(testId: number) {
  const test = await testRepository.findById(testId);

  if (!test) throw errors.notFound("Test");

  await testRepository.increaseViewsCount(test.id);
}
