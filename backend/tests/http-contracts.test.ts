import assert from "node:assert/strict";
import test from "node:test";
import type { NextFunction, Request, Response } from "express";

import { HttpError } from "../src/shared/errors/http-error";
import { sendSuccess } from "../src/shared/http/api-response";
import { errorMiddleware } from "../src/shared/middleware/error-middleware";

function createMockResponse() {
  const response = {
    statusCode: 200,
    payload: undefined as unknown,
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    json(body: unknown) {
      this.payload = body;
      return this;
    },
  };

  return response;
}

test("sendSuccess devuelve un envelope consistente con mensaje opcional", () => {
  const response = createMockResponse();

  sendSuccess(response as unknown as Response, 201, { id: 1 }, "Creado");

  assert.equal(response.statusCode, 201);
  assert.deepEqual(response.payload, {
    success: true,
    data: { id: 1 },
    message: "Creado",
  });
});

test("sendSuccess omite message cuando no se envia", () => {
  const response = createMockResponse();

  sendSuccess(response as unknown as Response, 200, { ok: true });

  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.payload, {
    success: true,
    data: { ok: true },
  });
});

test("errorMiddleware serializa HttpError con details", () => {
  const response = createMockResponse();

  errorMiddleware(
    new HttpError(422, "Payload invalido", { field: "title" }),
    {} as Request,
    response as unknown as Response,
    (() => undefined) as NextFunction,
  );

  assert.equal(response.statusCode, 422);
  assert.deepEqual(response.payload, {
    success: false,
    error: {
      message: "Payload invalido",
      details: { field: "title" },
    },
  });
});

test("errorMiddleware devuelve 500 normalizado para errores inesperados", () => {
  const response = createMockResponse();
  const originalConsoleError = console.error;
  console.error = () => undefined;

  try {
    errorMiddleware(
      new Error("boom"),
      {} as Request,
      response as unknown as Response,
      (() => undefined) as NextFunction,
    );
  } finally {
    console.error = originalConsoleError;
  }

  assert.equal(response.statusCode, 500);
  assert.deepEqual(response.payload, {
    success: false,
    error: {
      message: "Error interno del servidor",
    },
  });
});
