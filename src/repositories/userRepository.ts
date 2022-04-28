import { prisma } from "../connection.js";

export interface CreateUserData {
  email: string;
  password: string;
}

async function create(user: CreateUserData) {
  return await prisma.user.create({
    data: user
  });
}

async function findByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: { email }
  });

  return user;  
}

async function findById(id: number) {
  const user = await prisma.user.findUnique({
    where: { id }
  });

  return user;  
}

export default {
  create, 
  findByEmail,
  findById
}