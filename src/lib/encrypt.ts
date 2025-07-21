import bcrypt from "bcryptjs";
import { Config } from "../config";

export const encryptPassword = async (password: string): Promise<string> => {
  if (!password) {
    throw new Error("Password is required for encryption");
  }
  return await bcrypt.hash(password, bcrypt.genSaltSync(10));
};

export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  if (!password || !hash) {
    throw new Error("Password and hash are required for comparison");
  }
  return await bcrypt.compare(password, hash);
};
