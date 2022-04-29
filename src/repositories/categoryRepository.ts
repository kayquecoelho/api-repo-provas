import { prisma } from "../connection.js";

async function findAll() {
  const categories = await prisma.category.findMany();

  return categories;
}

async function findById(categoryId: number) {
  const category = await prisma.category.findUnique({
    where: {
      id: categoryId
    }
  });

  return category;
}

export default { findAll, findById };
