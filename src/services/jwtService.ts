import jwt, { SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.JWT_SECRET as string;

interface EncryptedToken {
  sessionId: number;
}

export function generateToken(sessionId: number){
  const data: EncryptedToken = { sessionId };
  const settings: SignOptions = { expiresIn: 3*60*60 }

  return jwt.sign(data, secretKey, settings);
}

export function validateToken(token: string) {
  return <EncryptedToken>jwt.verify(token, secretKey);
}