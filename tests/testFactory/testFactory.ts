import { prisma } from "../../src/connection.js";

export default async function testFactory(){
  const test = await prisma.test.create({
    data: {
      id: 1,
      name: "2022 - Teste",
      pdfUrl: "http://www.google.com",
      disciplineTeacherId: 1,
      categoryId: 1,
    }
  });
  return test;
}