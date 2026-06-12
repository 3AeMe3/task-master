import { z } from "zod";

import { HttpError } from "../errors/http-error";

export function parseWithSchema<TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  input: unknown,
): z.infer<TSchema> {
  const result = schema.safeParse(input);

  if (!result.success) {
    throw new HttpError(400, "Datos invalidos", result.error.flatten());
  }

  return result.data;
}

export function parseIdParam(
  value: string | string[] | undefined,
  field = "id",
): number {
  if (typeof value !== "string") {
    throw new HttpError(400, `No se encontro el ${field}`);
  }

  const parsedValue = Number(value);

  if (Number.isNaN(parsedValue)) {
    throw new HttpError(400, `No se encontro el ${field}`);
  }

  return parsedValue;
}
