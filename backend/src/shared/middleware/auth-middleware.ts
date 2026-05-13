import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { HttpError } from "../errors/http-error";
import { AuthUser } from "../types/auth-user";

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new HttpError(500, "JWT_SECRET no definido");
  }

  return secret;
}

function isAuthUser(payload: unknown): payload is AuthUser {
  return (
    typeof payload === "object" &&
    payload !== null &&
    "userId" in payload &&
    typeof payload.userId === "number" &&
    "email" in payload &&
    typeof payload.email === "string"
  );
}

export function verifyToken(req: Request, _res: Response, next: NextFunction) {
  try {
    let token = req.cookies?.access_token;

    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      throw new HttpError(401, "Token no proporcionado");
    }

    const decoded = jwt.verify(token, getJwtSecret());

    if (!isAuthUser(decoded)) {
      throw new HttpError(401, "Token invalido o expirado");
    }

    req.user = decoded;
    next();
  } catch (error) {
    next(
      error instanceof HttpError
        ? error
        : new HttpError(401, "Token invalido o expirado"),
    );
  }
}
