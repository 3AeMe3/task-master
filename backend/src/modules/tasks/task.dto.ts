import { isBefore, startOfDay } from "date-fns";

import { ProjectDto, toProjectDto } from "../projects/project.dto";

type SubTaskDtoInput = {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
};

type TaskCommentDtoInput = {
  id: number;
  content: string;
  createdAt: Date;
  author: {
    id: number;
    name: string;
  };
};

type TaskTagDtoInput = {
  tag: {
    id: number;
    name: string;
  };
};

type TaskDtoInput = {
  id: number;
  title: string;
  description: string | null;
  priority: "BAJO" | "NORMAL" | "URGENTE";
  status: "PENDIENTE" | "COMPLETADO" | "VENCIDO";
  createdAt: Date;
  updatedAt: Date;
  dueDate: Date | null;
  createdById: number;
  projectId: number;
  assigneeId: number | null;
  project?: {
    id: number;
    name: string;
    userId: number;
  } | null;
  taskTags?: TaskTagDtoInput[];
  subTasks?: SubTaskDtoInput[];
  comments?: TaskCommentDtoInput[];
};

export type SubTaskDto = {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
};

export type TaskCommentDto = {
  id: number;
  content: string;
  createdAt: string;
  author: {
    id: number;
    name: string;
  };
};

export type TaskTagDto = {
  id: number;
  name: string;
};

export type TaskDto = {
  id: number;
  title: string;
  description: string | null;
  priority: "BAJO" | "NORMAL" | "URGENTE";
  status: "PENDIENTE" | "COMPLETADO" | "VENCIDO";
  createdAt: string;
  updatedAt: string;
  dueDate: string | null;
  createdById: number;
  projectId: number;
  assigneeId: number | null;
  project: ProjectDto | null;
  tags: TaskTagDto[];
  subTasks: SubTaskDto[];
  comments: TaskCommentDto[];
};

export function resolveTaskStatus(task: Pick<TaskDtoInput, "status" | "dueDate">) {
  if (task.status === "COMPLETADO") {
    return "COMPLETADO";
  }

  if (!task.dueDate) {
    return "PENDIENTE";
  }

  return isBefore(startOfDay(task.dueDate), startOfDay(new Date())) ? "VENCIDO" : "PENDIENTE";
}

export function toSubTaskDto(subTask: SubTaskDtoInput): SubTaskDto {
  return {
    id: subTask.id,
    title: subTask.title,
    description: subTask.description,
    completed: subTask.completed,
  };
}

export function toTaskCommentDto(comment: TaskCommentDtoInput): TaskCommentDto {
  return {
    id: comment.id,
    content: comment.content,
    createdAt: comment.createdAt.toISOString(),
    author: {
      id: comment.author.id,
      name: comment.author.name,
    },
  };
}

export function toTaskTagDto(taskTag: TaskTagDtoInput): TaskTagDto {
  return {
    id: taskTag.tag.id,
    name: taskTag.tag.name,
  };
}

export function toTaskDto(task: TaskDtoInput): TaskDto {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    priority: task.priority,
    status: resolveTaskStatus(task),
    createdAt: task.createdAt.toISOString(),
    updatedAt: task.updatedAt.toISOString(),
    dueDate: task.dueDate?.toISOString() ?? null,
    createdById: task.createdById,
    projectId: task.projectId,
    assigneeId: task.assigneeId,
    project: task.project ? toProjectDto(task.project) : null,
    tags: task.taskTags?.map(toTaskTagDto) ?? [],
    subTasks: task.subTasks?.map(toSubTaskDto) ?? [],
    comments: task.comments?.map(toTaskCommentDto) ?? [],
  };
}
