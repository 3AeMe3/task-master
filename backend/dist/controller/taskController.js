import { prisma } from "../lib/prisma";
import * as z from "zod";
import { parse } from "date-fns";
const Task = z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(["PENDIENTE", "COMPLETADO", "VENCIDO"]).optional(),
    priority: z.enum(["BAJO", "NORMAL", "URGENTE"]),
    assigneeId: z.number().optional(),
    projectId: z.number(),
    dueDate: z.string().optional(),
});
export const getTasks = async (req, res) => {
    try {
        const userId = Number(req.user.userId);
        const tasks = await prisma.task.findMany({
            where: {
                createdById: userId,
            },
            include: {
                project: true,
            },
        });
        res.status(200).json(tasks);
    }
    catch (err) {
        console.error("getTasks error:", err);
        res.status(500).json({ message: "Error al obtener las tareas" });
    }
};
export const createTask = async (req, res) => {
    try {
        const body = req.body;
        //los safePase nunca lanzan un error, siempre retornan un objeto con la propiedad success,
        //por lo que no es necesario usar un try catch para capturar errores de validacion
        const dataResult = Task.safeParse(body);
        if (!dataResult.success) {
            console.log(dataResult.error);
            return res.json({
                ok: false,
                error: dataResult.error,
            });
        }
        const parsedDueDate = dataResult.data.dueDate
            ? parse(dataResult.data.dueDate, "yyyy-MM-dd", new Date())
            : undefined;
        const projectId = dataResult.data.projectId;
        const project = await prisma.project.findFirst({
            where: { userId: Number(req.user.userId), id: projectId },
        });
        if (!project) {
            return res.status(404).json({
                message: "No se encontro el proyecto con el id proporcionado",
            });
        }
        const newTask = await prisma.task.create({
            data: {
                title: dataResult.data.title,
                description: dataResult.data.description,
                dueDate: parsedDueDate,
                projectId: project?.id,
                priority: dataResult.data.priority,
                createdById: Number(req.user.userId),
                ...(dataResult.data.status !== undefined && {
                    status: dataResult.data.status,
                }),
                ...(dataResult.data.assigneeId !== undefined && {
                    assigneeId: dataResult.data.assigneeId,
                }),
            },
        });
        res.status(201).json(newTask);
    }
    catch (err) {
        console.error("prisma error", err);
        return res
            .status(500)
            .json({ message: "Error al crear la tarea", error: err });
    }
};
export const findTask = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) {
            return res.status(400).json({ message: "no se encontro el id" });
        }
        const findTask = await prisma.task.findFirst({
            where: { id },
        });
        if (!findTask) {
            return res.status(404).json({ message: "task no encontrado" });
        }
        //
        // const project = await prisma.project.findFirst({
        //   where: {
        //     userId: Number((req as any).user.userId),
        //     id: findTask.projectId,
        //   },
        // });
        //
        // if (!project) {
        //   return res.status(404).json({
        //     message: "No se encontro el proyecto default para el usuario",
        //   });
        // }
        //
        // const taskById = await prisma.task.findFirst({
        //   where: { id: id, projectId: project?.id },
        // });
        //
        res.status(201).json(findTask);
    }
    catch (err) {
        res.status(500).json({ message: "error al buscar el Task" });
    }
};
export const completeTask = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) {
            return res.status(400).json({ message: "No  se encontro el id" });
        }
        const findTask = await prisma.task.findFirst({
            where: { id },
        });
        if (!findTask) {
            return res.status(404).json({ message: "task no encontrado" });
        }
        console.log(findTask, "task encontrada");
        const project = await prisma.project.findFirst({
            where: {
                userId: Number(req.user.userId),
                id: findTask.projectId,
            },
        });
        if (!project) {
            console.log(project);
            return res.status(404).json({
                message: "No se encontro el proyecto ",
            });
        }
        const taskExists = await prisma.task.findFirst({
            where: { id, projectId: project?.id },
        });
        if (!taskExists) {
            return res.status(404).json({ message: "task no encontrado" });
        }
        const updatedTask = await prisma.task.update({
            where: { id },
            data: { status: "COMPLETADO" },
        });
        res.status(200).json(updatedTask);
    }
    catch (err) {
        res.status(500).json({ message: "error al intentar completar el task" });
    }
};
export const deleteTask = async (req, res) => {
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
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "error al intentar borrar el task" });
    }
};
export const editTask = async (req, res) => {
    try {
        const body = req.body;
        const id = Number(req.params.id);
        if (Number.isNaN(id)) {
            return res.status(400).json({ message: "No  se encontro el id" });
        }
        const taskEdit = await prisma.task.update({
            where: { id },
            data: { ...body },
        });
        res
            .status(200)
            .json({ message: "Task editada corretamente", task: taskEdit });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "error al intentar editar la tarea" });
    }
};
//# sourceMappingURL=taskController.js.map