import { prisma } from "../../lib/prisma.js";
import { HttpError } from "../../shared/errors/http-error.js";
export async function getMe(userId) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true, email: true },
    });
    if (!user) {
        throw new HttpError(404, "No se encontro al usuario");
    }
    return user;
}
//# sourceMappingURL=me.service.js.map