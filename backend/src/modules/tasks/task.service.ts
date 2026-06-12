import { parse } from "date-fns";

import { Prisma, STATUS } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { HttpError } from "../../shared/errors/http-error";
import {
  CreateSubTaskInput,
  CreateTaskCommentInput,
  CreateTaskTagInput,
  CreateTaskInput,
  UpdateTaskInput,
} from "./task.schemas";

const taskDetailInclude = {
  project: true,
  taskTags: {
    orderBy: {
      tagId: "asc" as const,
    },
    include: {
      tag: true,
    },
  },
  subTasks: {
    orderBy: {
      id: "asc" as const,
    },
  },
  comments: {
    orderBy: {
      createdAt: "asc" as const,
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

async function getOwnedProjectOrThrow(userId: number, projectId: number) {
  const project = await prisma.project.findFirst({
    where: { id: projectId, userId },
  });

  if (!project) {
    throw new HttpError(
      404,
      "No se encontro el proyecto con el id proporcionado",
    );
  }

  return project;
}

async function getOwnedTaskOrThrow(userId: number, taskId: number) {
  const task = await prisma.task.findFirst({
    where: { id: taskId, createdById: userId },
    include: taskDetailInclude,
  });

  if (!task) {
    throw new HttpError(404, "task no encontrado");
  }

  return task;
}

async function getOwnedSubTaskOrThrow(
  userId: number,
  taskId: number,
  subTaskId: number,
) {
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

async function getOwnedTaskCommentOrThrow(
  userId: number,
  taskId: number,
  commentId: number,
) {
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

function parseDueDate(dueDate?: string) {
  if (!dueDate) {
    return null;
  }

  return parse(dueDate, "yyyy-MM-dd", new Date());
}

function normalizeWritableStatus(
  status?: CreateTaskInput["status"] | UpdateTaskInput["status"],
) {
  if (status === undefined) {
    return undefined;
  }

  return status === "COMPLETADO" ? STATUS.COMPLETADO : STATUS.PENDIENTE;
}

function normalizeTagName(name: string) {
  return name.trim().toLowerCase();
}

async function assignTagsToTask(
  taskId: number,
  tagNames: string[] | undefined,
) {
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

export async function getTasks(userId: number) {
  return prisma.task.findMany({
    where: { createdById: userId },
    include: taskDetailInclude,
  });
}

export async function createTask(userId: number, input: CreateTaskInput) {
  const project = await getOwnedProjectOrThrow(userId, input.projectId);
  const normalizedStatus = normalizeWritableStatus(input.status);
  const data: Prisma.TaskUncheckedCreateInput = {
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

export async function findTask(userId: number, taskId: number) {
  return getOwnedTaskOrThrow(userId, taskId);
}

export async function completeTask(userId: number, taskId: number) {
  await getOwnedTaskOrThrow(userId, taskId);

  return prisma.task.update({
    where: { id: taskId },
    data: { status: "COMPLETADO" },
    include: taskDetailInclude,
  });
}

export async function deleteTask(userId: number, taskId: number) {
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

export async function addTaskTag(
  userId: number,
  taskId: number,
  input: CreateTaskTagInput,
) {
  await getOwnedTaskOrThrow(userId, taskId);
  await assignTagsToTask(taskId, [input.name]);

  return getOwnedTaskOrThrow(userId, taskId);
}

export async function removeTaskTag(
  userId: number,
  taskId: number,
  tagId: number,
) {
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

export async function editTask(
  userId: number,
  taskId: number,
  input: UpdateTaskInput,
) {
  await getOwnedTaskOrThrow(userId, taskId);
  const normalizedStatus = normalizeWritableStatus(input.status);

  if (input.projectId !== undefined) {
    await getOwnedProjectOrThrow(userId, input.projectId);
  }

  const data: Prisma.TaskUncheckedUpdateInput = {
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

export async function createSubTask(
  userId: number,
  taskId: number,
  input: CreateSubTaskInput,
) {
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

export async function toggleSubTask(
  userId: number,
  taskId: number,
  subTaskId: number,
) {
  const subTask = await getOwnedSubTaskOrThrow(userId, taskId, subTaskId);

  await prisma.subTask.update({
    where: { id: subTaskId },
    data: {
      completed: !subTask.completed,
    },
  });

  return getOwnedTaskOrThrow(userId, taskId);
}

export async function deleteSubTask(
  userId: number,
  taskId: number,
  subTaskId: number,
) {
  await getOwnedSubTaskOrThrow(userId, taskId, subTaskId);

  await prisma.subTask.delete({
    where: { id: subTaskId },
  });

  return getOwnedTaskOrThrow(userId, taskId);
}

export async function createTaskComment(
  userId: number,
  taskId: number,
  input: CreateTaskCommentInput,
) {
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

export async function deleteTaskComment(
  userId: number,
  taskId: number,
  commentId: number,
) {
  await getOwnedTaskCommentOrThrow(userId, taskId, commentId);

  await prisma.taskComment.delete({
    where: { id: commentId },
  });

  return getOwnedTaskOrThrow(userId, taskId);
}
