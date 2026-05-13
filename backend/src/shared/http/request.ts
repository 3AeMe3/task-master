import { Request } from "express";

import { HttpError } from "../errors/http-error";

export function requireUserId(req: Request): number {
  const userId = req.user?.userId;

  if (!userId) {
    throw new HttpError(401, "No autorizado, no se encontro el userId");
  }

  return userId;
}
