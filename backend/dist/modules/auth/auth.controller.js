import { asyncHandler } from "../../shared/http/async-handler.js";
import { sendSuccess } from "../../shared/http/api-response.js";
import { parseWithSchema } from "../../shared/http/validation.js";
import { toCurrentUserDto } from "../me/me.dto.js";
import { getAuthCookieName, getAuthCookieOptions, loginUser, registerUser, } from "./auth.service.js";
import { loginSchema, registerSchema } from "./auth.schemas.js";
export const registerUserController = asyncHandler(async (req, res) => {
    const input = parseWithSchema(registerSchema, req.body);
    const user = await registerUser(input);
    sendSuccess(res, 201, toCurrentUserDto(user), "Usuario registrado correctamente");
});
export const loginUserController = asyncHandler(async (req, res) => {
    const input = parseWithSchema(loginSchema, req.body);
    const { accessToken } = await loginUser(input);
    res.cookie(getAuthCookieName(), accessToken, getAuthCookieOptions());
    sendSuccess(res, 200, null, "Logged in");
});
export function logoutUserController(_req, res) {
    res.clearCookie(getAuthCookieName(), getAuthCookieOptions());
    sendSuccess(res, 200, null, "Logged out");
}
//# sourceMappingURL=auth.controller.js.map