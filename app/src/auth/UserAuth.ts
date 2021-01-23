import { AuthenticationError } from "apollo-server-express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User as UserType } from "../generated/graphql";
const SECRET = process.env.SECRET_KEY || "";

export interface DecodedUser {
  userId: string;
  exp: number;
  iat: number;
}

export const matchUser = (password: string, userPassword: string) =>
  bcrypt.compareSync(password, userPassword);

export const generateUserToken = (user: UserType) =>
  SECRET ? jwt.sign({ userId: user.id }, SECRET, { expiresIn: "10m" }) : null;

export const verifyToken = (token: string) => jwt.verify(token, SECRET);

export const decodedToken = (
  token: string,
  requireAuth = true
): DecodedUser | null => {
  if (requireAuth) {
    const tokenValue = token.replace("Bearer ", "");
    if (!tokenValue) return null;
    try {
      const user: DecodedUser = verifyToken(tokenValue) as DecodedUser;

      if (user) return user;
    } catch (error) {
      throw new AuthenticationError(error);
    }
    throw new AuthenticationError("Login in to access resource");
  }

  return null;
};
