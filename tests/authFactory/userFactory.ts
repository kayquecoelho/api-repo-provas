import { User } from "@prisma/client";
import { connection } from "../../src/connection.js";

type CreateUserData = Omit<User, "id">
export default async function userFactory(user: CreateUserData) {
  return connection.user.create({
    data: user,
  });
}
