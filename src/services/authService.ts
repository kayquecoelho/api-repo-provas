import userRepository, { CreateUserData } from "../repositories/userRepository.js";
import * as errors from "../errors/errors.js"
import * as bcryptService from "./bcryptService.js";
import * as jwtService from "./jwtService.js";
import sessionRepository from "../repositories/sessionsRepository.js";

export async function createUser(userData: CreateUserData) {
  const user = await userRepository.findByEmail(userData.email);
  
  if (user) throw errors.conflict("User");

  const hashedPassword = bcryptService.encrypt(userData.password);

  await userRepository.create({...userData, password: hashedPassword});
}

export async function login(email: string, password: string) {
  const user = await userRepository.findByEmail(email);

  if (!user) throw errors.unauthorized("Email and/or password");

  if (bcryptService.compareKeys(password, user.password)) {
    const session = await sessionRepository.create({ userId: user.id });

    const token = jwtService.generateToken(session.id);

    return token;
  }

  throw errors.unauthorized("Email and/or password")
}

export async function validateToken(token: string) {
  if (typeof token !== 'string') throw errors.unauthorized("token");

  const { sessionId } = jwtService.validateToken(token);

  const session = await sessionRepository.findById(sessionId);

  if (!session) throw errors.unauthorized("Token");

  return session;
}