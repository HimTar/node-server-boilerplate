import { Request, Response } from "express";
import { createNewUser, loginUser } from "./auth.service";

export const CreateNewAccount = async (req: Request, res: Response) => {
  await createNewUser(req.body);

  return res.status(201).send({
    status: 201,
    message: "Account created successfully",
    data: {
      username: req.body.username,
      email: req.body.email,
    },
  });
};

export const LoginUser = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  const { userId, token } = await loginUser(password, username, email);

  return res.status(200).send({
    message: "Login successful",
    data: {
      username,
      email,
      userId,
      token,
    },
  });
};
