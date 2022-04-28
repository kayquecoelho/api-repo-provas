import { User } from "@prisma/client";
import { prisma } from "../../src/connection.js";

type CreateUserData = Omit<User, "id">
export default async function userFactory(user: CreateUserData) {
  return prisma.user.create({
    data: user,
  });
}
