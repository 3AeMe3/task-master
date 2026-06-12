import { Request } from "express";

import { HttpError } from "../errors/http-error";
import { AuthUser } from "../types/auth-user";

export function requireUserId(req: Request & { user?: AuthUser }): number {
  const userId = req.user?.userId;

  if (!userId) {
    throw new HttpError(401, "No autorizado, no se encontro el userId");
  }

  return userId;
}
