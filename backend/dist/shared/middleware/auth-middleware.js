import jwt from "jsonwebtoken";
import { HttpError } from "../errors/http-error.js";
function getJwtSecret() {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new HttpError(500, "JWT_SECRET no definido");
    }
    return secret;
}
function isAuthUser(payload) {
    return (typeof payload === "object" &&
        payload !== null &&
        "userId" in payload &&
        typeof payload.userId === "number" &&
        "email" in payload &&
        typeof payload.email === "string");
}
export function verifyToken(req, _res, next) {
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
    }
    catch (error) {
        next(error instanceof HttpError
            ? error
            : new HttpError(401, "Token invalido o expirado"));
    }
}
//# sourceMappingURL=auth-middleware.js.map