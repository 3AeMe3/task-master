import { NextFunction, Request, Response } from "express";
import { AuthUser } from "../types/auth-user.js";
export declare function verifyToken(req: Request & {
    user?: AuthUser;
}, _res: Response, next: NextFunction): void;
//# sourceMappingURL=auth-middleware.d.ts.map