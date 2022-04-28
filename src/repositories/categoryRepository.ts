import { prisma } from "../connection.js";

async function findAll() {
  const categories = await prisma.category.findMany();

  return categories;
}

export default { findAll };
