import Joi from "joi";

export const createNewUserSchema = Joi.object({
  username: Joi.string().min(3).max(255).required(),
  email: Joi.string().email().max(255).required(),
  password: Joi.string().min(6).max(255).required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().max(255).optional(),
  username: Joi.string().min(3).max(255).optional(),
  password: Joi.string().min(6).max(255).required(),
});
