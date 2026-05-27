import { CookieOptions } from "express";
import { LoginInput, RegisterInput } from "./auth.schemas";
export declare function getAuthCookieName(): string;
export declare function getAuthCookieOptions(): CookieOptions;
export declare function registerUser(input: RegisterInput): Promise<{
    id: number;
    email: string;
    name: string;
}>;
export declare function loginUser(input: LoginInput): Promise<{
    accessToken: string;
}>;
//# sourceMappingURL=auth.service.d.ts.map