import { HttpError } from "../errors/http-error.js";
export function parseWithSchema(schema, input) {
    const result = schema.safeParse(input);
    if (!result.success) {
        throw new HttpError(400, "Datos invalidos", result.error.flatten());
    }
    return result.data;
}
export function parseIdParam(value, field = "id") {
    if (typeof value !== "string") {
        throw new HttpError(400, `No se encontro el ${field}`);
    }
    const parsedValue = Number(value);
    if (Number.isNaN(parsedValue)) {
        throw new HttpError(400, `No se encontro el ${field}`);
    }
    return parsedValue;
}
//# sourceMappingURL=validation.js.map