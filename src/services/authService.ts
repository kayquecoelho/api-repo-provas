import userRepository, { CreateUserData } from "../repositories/userRepository.js";
import * as errors from "../errors/errors.js"
import * as bcryptService from "./bcryptService.js";

export async function createUser(userData: CreateUserData) {
  const user = await userRepository.findByEmail(userData.email);
  
  if (user) throw errors.conflict("User");

  const hashedPassword = bcryptService.encrypt(userData.password);

  await userRepository.create({...userData, password: hashedPassword});
}