import { prisma } from "../../lib/prisma";
import { HttpError } from "../../shared/errors/http-error";
import { CreateProjectInput } from "./project.schemas";

export async function createProject(userId: number, input: CreateProjectInput) {
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

export async function getProjects(userId: number) {
  return prisma.project.findMany({
    where: { userId },
  });
}
