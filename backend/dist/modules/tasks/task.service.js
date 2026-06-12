import { parse } from "date-fns";
import { STATUS } from "../../generated/prisma/client.js";
import { prisma } from "../../lib/prisma.js";
import { HttpError } from "../../shared/errors/http-error.js";
const taskDetailInclude = {
    project: true,
    taskTags: {
        orderBy: {
            tagId: "asc",
        },
        include: {
            tag: true,
        },
    },
    subTasks: {
        orderBy: {
            id: "asc",
        },
    },
    comments: {
        orderBy: {
            createdAt: "asc",
        },
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    },
};
async function getOwnedProjectOrThrow(userId, projectId) {
    const project = await prisma.project.findFirst({
        where: { id: projectId, userId },
    });
    if (!project) {
        throw new HttpError(404, "No se encontro el proyecto con el id proporcionado");
    }
    return project;
}
async function getOwnedTaskOrThrow(userId, taskId) {
    const task = await prisma.task.findFirst({
        where: { id: taskId, createdById: userId },
        include: taskDetailInclude,
    });
    if (!task) {
        throw new HttpError(404, "task no encontrado");
    }
    return task;
}
async function getOwnedSubTaskOrThrow(userId, taskId, subTaskId) {
    const subTask = await prisma.subTask.findFirst({
        where: {
            id: subTaskId,
            taskId,
            task: {
                createdById: userId,
            },
        },
    });
    if (!subTask) {
        throw new HttpError(404, "Subtarea no encontrada");
    }
    return subTask;
}
async function getOwnedTaskCommentOrThrow(userId, taskId, commentId) {
    const comment = await prisma.taskComment.findFirst({
        where: {
            id: commentId,
            taskId,
            task: {
                createdById: userId,
            },
        },
    });
    if (!comment) {
        throw new HttpError(404, "Comentario no encontrado");
    }
    return comment;
}
function parseDueDate(dueDate) {
    if (!dueDate) {
        return null;
    }
    return parse(dueDate, "yyyy-MM-dd", new Date());
}
function normalizeWritableStatus(status) {
    if (status === undefined) {
        return undefined;
    }
    return status === "COMPLETADO" ? STATUS.COMPLETADO : STATUS.PENDIENTE;
}
function normalizeTagName(name) {
    return name.trim().toLowerCase();
}
async function assignTagsToTask(taskId, tagNames) {
    const normalizedTagNames = [
        ...new Set((tagNames ?? []).map(normalizeTagName).filter(Boolean)),
    ];
    for (const tagName of normalizedTagNames) {
        const tag = await prisma.tag.upsert({
            where: { name: tagName },
            update: {},
            create: {
                name: tagName,
            },
        });
        await prisma.taskTag.upsert({
            where: {
                taskId_tagId: {
                    taskId,
                    tagId: tag.id,
                },
            },
            update: {},
            create: {
                taskId,
                tagId: tag.id,
            },
        });
    }
}
export async function getTasks(userId) {
    return prisma.task.findMany({
        where: { createdById: userId },
        include: taskDetailInclude,
    });
}
export async function createTask(userId, input) {
    const project = await getOwnedProjectOrThrow(userId, input.projectId);
    const normalizedStatus = normalizeWritableStatus(input.status);
    const data = {
        title: input.title,
        description: input.description,
        priority: input.priority,
        projectId: project.id,
        createdById: userId,
        dueDate: parseDueDate(input.dueDate),
        ...(normalizedStatus !== undefined ? { status: normalizedStatus } : {}),
        ...(input.assigneeId !== undefined ? { assigneeId: input.assigneeId } : {}),
    };
    const task = await prisma.task.create({
        data,
    });
    await assignTagsToTask(task.id, input.tags);
    return getOwnedTaskOrThrow(userId, task.id);
}
export async function findTask(userId, taskId) {
    return getOwnedTaskOrThrow(userId, taskId);
}
export async function completeTask(userId, taskId) {
    await getOwnedTaskOrThrow(userId, taskId);
    return prisma.task.update({
        where: { id: taskId },
        data: { status: "COMPLETADO" },
        include: taskDetailInclude,
    });
}
export async function deleteTask(userId, taskId) {
    const task = await getOwnedTaskOrThrow(userId, taskId);
    await prisma.$transaction([
        prisma.taskTag.deleteMany({
            where: { taskId },
        }),
        prisma.subTask.deleteMany({
            where: { taskId },
        }),
        prisma.taskComment.deleteMany({
            where: { taskId },
        }),
        prisma.task.delete({
            where: { id: taskId },
        }),
    ]);
    return task;
}
export async function addTaskTag(userId, taskId, input) {
    await getOwnedTaskOrThrow(userId, taskId);
    await assignTagsToTask(taskId, [input.name]);
    return getOwnedTaskOrThrow(userId, taskId);
}
export async function removeTaskTag(userId, taskId, tagId) {
    const task = await getOwnedTaskOrThrow(userId, taskId);
    const assignedTag = task.taskTags.find((taskTag) => taskTag.tagId === tagId);
    if (!assignedTag) {
        throw new HttpError(404, "Etiqueta no encontrada en esta tarea");
    }
    await prisma.taskTag.delete({
        where: {
            taskId_tagId: {
                taskId,
                tagId,
            },
        },
    });
    return getOwnedTaskOrThrow(userId, taskId);
}
export async function editTask(userId, taskId, input) {
    await getOwnedTaskOrThrow(userId, taskId);
    const normalizedStatus = normalizeWritableStatus(input.status);
    if (input.projectId !== undefined) {
        await getOwnedProjectOrThrow(userId, input.projectId);
    }
    const data = {
        ...(input.title !== undefined ? { title: input.title } : {}),
        ...(input.description !== undefined
            ? { description: input.description }
            : {}),
        ...(normalizedStatus !== undefined ? { status: normalizedStatus } : {}),
        ...(input.priority !== undefined ? { priority: input.priority } : {}),
        ...(input.projectId !== undefined ? { projectId: input.projectId } : {}),
        ...(input.assigneeId !== undefined ? { assigneeId: input.assigneeId } : {}),
        ...(input.dueDate !== undefined
            ? { dueDate: parseDueDate(input.dueDate) }
            : {}),
    };
    return prisma.task.update({
        where: { id: taskId },
        data,
        include: taskDetailInclude,
    });
}
export async function createSubTask(userId, taskId, input) {
    await getOwnedTaskOrThrow(userId, taskId);
    await prisma.subTask.create({
        data: {
            taskId,
            title: input.title,
            ...(input.description ? { description: input.description } : {}),
        },
    });
    return getOwnedTaskOrThrow(userId, taskId);
}
export async function toggleSubTask(userId, taskId, subTaskId) {
    const subTask = await getOwnedSubTaskOrThrow(userId, taskId, subTaskId);
    await prisma.subTask.update({
        where: { id: subTaskId },
        data: {
            completed: !subTask.completed,
        },
    });
    return getOwnedTaskOrThrow(userId, taskId);
}
export async function deleteSubTask(userId, taskId, subTaskId) {
    await getOwnedSubTaskOrThrow(userId, taskId, subTaskId);
    await prisma.subTask.delete({
        where: { id: subTaskId },
    });
    return getOwnedTaskOrThrow(userId, taskId);
}
export async function createTaskComment(userId, taskId, input) {
    await getOwnedTaskOrThrow(userId, taskId);
    await prisma.taskComment.create({
        data: {
            taskId,
            authorId: userId,
            content: input.content,
        },
    });
    return getOwnedTaskOrThrow(userId, taskId);
}
export async function deleteTaskComment(userId, taskId, commentId) {
    await getOwnedTaskCommentOrThrow(userId, taskId, commentId);
    await prisma.taskComment.delete({
        where: { id: commentId },
    });
    return getOwnedTaskOrThrow(userId, taskId);
}
//# sourceMappingURL=task.service.js.map