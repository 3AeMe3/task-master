import { prisma } from "../../lib/prisma";
import { HttpError } from "../../shared/errors/http-error";
export async function createProject(userId, input) {
    const existingProject = await prisma.project.findFirst({
        where: { userId, name: input.name },
    });
    if (existingProject) {
        throw new HttpError(400, "Ya existe el proyecto");
    }
    return prisma.project.create({
        data: {
            name: input.name,
            userId,
        },
    });
}
export async function getProjects(userId) {
    return prisma.project.findMany({
        where: { userId },
    });
}
//# sourceMappingURL=project.service.js.map