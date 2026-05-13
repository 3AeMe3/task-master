import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const postProject = async (req: Request, res: Response) => {
  const { name } = req.body;

  const userId = req.user?.userId;
  if (!userId) {
    return res
      .status(401)
      .json({ message: "No autorizado, no se encontro el userId" });
  }

  if (!name) {
    return res
      .status(400)
      .json({ message: "El nombre del proyecto es requerido" });
  }

  try {
    const existingProject = await prisma.project.findFirst({
      where: { userId: userId, name: name },
    });

    if (existingProject) {
      return res.status(400).json({ message: "Ya existe el proyecto" });
    }

    const project = await prisma.project.create({
      data: {
        name: name,
        userId: userId,
      },
    });
    res
      .status(201)
      .json({ message: "se creo el proyecto correctamente", data: project });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error al crear el project" });
  }
};

export const getProjects = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res
        .status(401)
        .json({ message: "No autorizado, no se encontro el userId" });
    }

    const projects = await prisma.project.findMany({
      where: { userId: userId },
    });
    res.status(200).json(projects);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Fallo en obtener los projectos" });
  }
};
