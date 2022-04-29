import { Test } from "@prisma/client";
import { prisma } from "../connection.js";

export type CreateTestData = Omit<Test, "id" | "viewsCount">

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

async function create(testData: CreateTestData) {
  return prisma.test.create({
    data: testData
  });
}

export default {
  increaseViewsCount,
  findById,
  create
};
