import { User } from "@prisma/client";
import { prisma } from "../../src/connection.js";
import * as bcryptService from "../../src/services/bcryptService.js";

type CreateUserData = Omit<User, "id">;

export default async function userFactory(user: CreateUserData) {
  const hashedPassword = bcryptService.encrypt(user.password);

  return prisma.user.create({
    data: {...user, password: hashedPassword}
  });
}
