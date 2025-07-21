import { Express, Router } from "express";
import { CreateNewAccount, LoginUser } from "./auth.controller";
import { validateRequest } from "../../middlewares/schemaValidator";
import { createNewUserSchema, loginUserSchema } from "./auth.schema";
import { asyncHandler } from "../../utils/asyncHandler";

export default async (app: Express) => {
  const router = Router();
  app.use("/auth", router);

  router.post(
    "/signup",
    validateRequest(createNewUserSchema, "body"),
    asyncHandler(CreateNewAccount)
  );

  router.post(
    "/login",
    validateRequest(loginUserSchema, "body"),
    asyncHandler(LoginUser)
  );
};
