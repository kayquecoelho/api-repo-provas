import { prisma } from "../connection.js";

async function increaseViewsCount(testId: number) {
  return prisma.test.update({
    where: {
      id: testId,
    },
    data: {
      viewsCount: {
        increment: 1,
      },
    },
  });
}

async function findById(testId: number) {
  const test = prisma.test.findUnique({
    where: {
      id: testId,
    },
  });
  return test;
}

export default {
  increaseViewsCount,
  findById
};
