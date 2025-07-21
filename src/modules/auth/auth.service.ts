import { CreateUserInput, User } from "../../database/models/user";
import { BadRequest } from "http-errors";
import { dbClient } from "../../database";
import { generateV7Uuid } from "../../lib/uuid";
import { comparePassword, encryptPassword } from "../../lib/encrypt";
import { generateToken } from "../../lib/jwt";
import { Config } from "../../config";

export const createNewUser = async (user: CreateUserInput) => {
  const { username, email, password } = user;

  await validateUserInput(user);

  await dbClient.transaction(async () => {
    const userId = generateV7Uuid();
    const encryptedPassword = await encryptPassword(password);

    await dbClient.userQueries.createUser({
      id: userId,
      email,
      username,
      password_hash: encryptedPassword,
      is_email_verified: false,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });

    await dbClient.userQueries.createUserProfile({
      id: generateV7Uuid(),
      user_id: userId,
      full_name: null,
      bio: null,
      avatar_url: null,
      date_of_birth: null,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return;
  });
};

const validateUserInput = async (user: CreateUserInput) => {
  let existingUser = await dbClient.userQueries?.findUserByEmail(user.email);
  if (existingUser) {
    throw new BadRequest("Email already in use");
  }

  existingUser = await dbClient.userQueries?.findUserByUsername(user.username);
  if (existingUser) {
    throw new BadRequest("Username already in use");
  }
};

export const loginUser = async (
  password: string,
  username?: string,
  email?: string
) => {
  if (!email && !username) {
    throw new BadRequest("Either email or username must be provided");
  }

  let user: User | null = null;

  if (email) {
    user = await dbClient.userQueries.findUserByEmail(email);
  } else if (username) {
    user = await dbClient.userQueries.findUserByUsername(username);
  }

  if (!user) {
    throw new BadRequest("User not found");
  }

  const isPasswordValid = await comparePassword(password, user.password_hash);

  if (!isPasswordValid) {
    throw new BadRequest("Invalid password");
  }

  return {
    userId: user.id,
    token: generateUserLoginToken(user),
  };
};

const generateUserLoginToken = (user: User) => {
  const payload = {
    userId: user.id,
    email: user.email,
    username: user.username,
  };

  return generateToken(payload, Config.JWT_SECRET, Config.JWT_EXPIRATION_TIME);
};
