import { HttpError } from "../errors/http-error";
export function errorMiddleware(error, _req, res, _next) {
    if (error instanceof HttpError) {
        const payload = {
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
    });
}
//# sourceMappingURL=error-middleware.js.map