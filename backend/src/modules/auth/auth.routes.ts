import { Router } from "express";

import {
  loginUserController,
  logoutUserController,
  registerUserController,
} from "./auth.controller";

const authRouter = Router();

authRouter.post("/register", registerUserController);
authRouter.post("/login", loginUserController);
authRouter.post("/logOut", logoutUserController);

export default authRouter;
