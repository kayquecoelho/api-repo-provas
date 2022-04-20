import bcrypt from "bcrypt";

export function encrypt(key: string) {
  return bcrypt.hashSync(key, 8);
}

export function compareKeys(key: string, hashedKey: string) {
  return bcrypt.compareSync(key, hashedKey);
}