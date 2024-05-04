import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET

export function generateToken(payload: any): string {
  return jwt.sign(payload, secretKey, { expiresIn: '7d'}) 
}