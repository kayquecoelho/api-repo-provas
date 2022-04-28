import { prisma } from "../connection.js";

async function findAll() {
  const disciplines = await prisma.discipline.findMany();
  return disciplines;
}

export default { findAll };
