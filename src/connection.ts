import pkg from "@prisma/client";

const { PrismaClient } = pkg;
export const connection = new PrismaClient();