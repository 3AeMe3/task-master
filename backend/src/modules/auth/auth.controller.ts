import { Request, Response } from "express";

import { asyncHandler } from "../../shared/http/async-handler";
import { sendSuccess } from "../../shared/http/api-response";
import { parseWithSchema } from "../../shared/http/validation";
import { toCurrentUserDto } from "../me/me.dto";
import {
  getAuthCookieName,
  getAuthCookieOptions,
  loginUser,
  registerUser,
} from "./auth.service";
import { loginSchema, registerSchema } from "./auth.schemas";

export const registerUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const input = parseWithSchema(registerSchema, req.body);
    const user = await registerUser(input);

    sendSuccess(
      res,
      201,
      toCurrentUserDto(user),
      "Usuario registrado correctamente",
    );
  },
);

export const loginUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const input = parseWithSchema(loginSchema, req.body);
    const { accessToken } = await loginUser(input);

    // res.cookie(getAuthCookieName(), accessToken, getAuthCookieOptions());
    sendSuccess(res, 200, { accessToken }, "Logged in");
  },
);

export function logoutUserController(_req: Request, res: Response) {
  res.clearCookie(getAuthCookieName(), getAuthCookieOptions());
  sendSuccess(res, 200, null, "Logged out");
}
