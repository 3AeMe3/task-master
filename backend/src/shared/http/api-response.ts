import { Response } from "express";

export type ApiSuccessResponse<T> = {
  success: true;
  data: T;
  message?: string;
};

export type ApiErrorResponse = {
  success: false;
  error: {
    message: string;
    details?: unknown;
  };
};

export function sendSuccess<T>(
  res: Response,
  statusCode: number,
  data: T,
  message?: string,
) {
  const payload: ApiSuccessResponse<T> = {
    success: true,
    data,
    ...(message ? { message } : {}),
  };

  return res.status(statusCode).json(payload);
}
