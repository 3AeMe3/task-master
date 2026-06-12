import { HttpError } from "../errors/http-error.js";
export function requireUserId(req) {
    const userId = req.user?.userId;
    if (!userId) {
        throw new HttpError(401, "No autorizado, no se encontro el userId");
    }
    return userId;
}
//# sourceMappingURL=request.js.map