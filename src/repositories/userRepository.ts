import { connection } from "../connection.js";

export interface CreateUserData {
  email: string;
  password: string;
}

async function create(user: CreateUserData) {
  return await connection.user.create({
    data: user
  });
}

async function findByEmail(email: string) {
  const user = await connection.user.findUnique({
    where: { email }
  });

  return user;  
}

export default {
  create, 
  findByEmail
}