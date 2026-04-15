import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import * as z from "zod";

const Task = z.object({
  title: z.string(),
  description: z.string(),
  status: z.enum(["PENDIENTE", "COMPLETADO", "VENCIDO"]).optional(),
  priority: z.enum(["BAJO", "NORMAL", "URGENTE"]).optional(),
  projectId: z.number(),
  assigneeId: z.number().optional(),
});

export const getTasks = async (_: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany();
    res.status(200).json(tasks);
  } catch (err) {
    console.error("getTasks error:", err);
    res.status(500).json({ message: "Error al obtener las tareas" });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const dataResult = Task.safeParse(body);
    if (!dataResult.success) {
      return res.json({
        ok: false,
        error: dataResult.error,
      });
    }
    const newTask = await prisma.task.create({
      data: { ...dataResult.data, createdById: 1 },
    });
    res.status(201).json(newTask);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error al crear la tarea", error: err });
  }
};

export const findTask = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "no se encontro el id" });
    }

    const taskById = await prisma.task.findFirst({
      where: { id: id },
    });

    res.status(201).json(taskById);
  } catch (err) {
    res.status(500).json({ message: "error al buscar el Task" });
  }
};

export const completeTask = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "No  se encontro el id" });
    }

    const taskExists = await prisma.task.findFirst({
      where: { id },
    });

    if (!taskExists) {
      return res.status(404).json({ message: "task no encontrado" });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: { status: "COMPLETADO" },
    });

    res.status(200).json(updatedTask);
  } catch (err) {
    console.error("este es el error", err);
    res.status(500).json({ message: "error al intentar completar el task" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "no se encontro el id" });
    }

    const deletedTask = await prisma.task.delete({
      where: { id },
    });

    return res
      .status(200)
      .json({ message: "Task eleminida corretamente", task: deletedTask });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "error al intentar borrar el task" });
  }
};
