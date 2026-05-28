import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../lib/prisma";
import { HttpError } from "../../shared/errors/http-error";
const AUTH_COOKIE_NAME = "access_token";
function getJwtSecret() {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new HttpError(500, "JWT_SECRET no definido");
    }
    return secret;
}
export function getAuthCookieName() {
    return AUTH_COOKIE_NAME;
}
export function getAuthCookieOptions() {
    const isProd = process.env.NODE_ENV === "production";
    return {
        httpOnly: true,
        secure: isProd,
        // For cross-site cookies (frontend on different domain) use 'none' in production
        sameSite: isProd ? "none" : "lax",
        path: "/",
    };
}
function buildAccessToken(payload) {
    return jwt.sign(payload, getJwtSecret(), { expiresIn: "1h" });
}
export async function registerUser(input) {
    const existingUser = await prisma.user.findUnique({
        where: { email: input.email },
    });
    if (existingUser) {
        throw new HttpError(409, "El usuario ya existe");
    }
    const hashedPassword = await bcrypt.hash(input.password, 10);
    const { user } = await prisma.$transaction(async (tx) => {
        const createdUser = await tx.user.create({
            data: {
                name: input.name,
                email: input.email,
                password: hashedPassword,
            },
        });
        await tx.project.create({
            data: { name: "default", userId: createdUser.id },
        });
        return { user: createdUser };
    });
    const { password: _password, ...safeUser } = user;
    return safeUser;
}
export async function loginUser(input) {
    const user = await prisma.user.findUnique({
        where: { email: input.email },
    });
    if (!user) {
        throw new HttpError(404, "No se encontro al usuario");
    }
    const isValidPassword = await bcrypt.compare(input.password, user.password);
    if (!isValidPassword) {
        throw new HttpError(401, "Credenciales incorrectas");
    }
    return {
        accessToken: buildAccessToken({ userId: user.id, email: user.email }),
    };
}
//# sourceMappingURL=auth.service.js.map