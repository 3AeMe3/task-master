import { NextFunction, Request, Response } from "express";

import { HttpError } from "../errors/http-error";
import { ApiErrorResponse } from "../http/api-response";

export function errorMiddleware(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (error instanceof HttpError) {
    const payload: ApiErrorResponse = {
      success: false,
      error: {
        message: error.message,
        ...(error.details !== undefined && { details: error.details }),
      },
    };

    return res.status(error.statusCode).json(payload);
  }

  console.error(error);

  return res.status(500).json({
    success: false,
    error: { message: "Error interno del servidor" },
  } satisfies ApiErrorResponse);
}
