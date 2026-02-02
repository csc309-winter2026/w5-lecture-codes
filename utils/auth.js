import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Put these in environment variables
const SALT_ROUNDS = 10;
const JWT_SECRET = "lr4e4";
const JWT_EXPIRES_IN = "1h";

export async function hashPassword(password) {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

export function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}
