import { ProjectDto, toProjectDto } from "../projects/project.dto";

type SubTaskDtoInput = {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
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
  subTasks?: SubTaskDtoInput[];
};

export type SubTaskDto = {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
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
  subTasks: SubTaskDto[];
};

export function toSubTaskDto(subTask: SubTaskDtoInput): SubTaskDto {
  return {
    id: subTask.id,
    title: subTask.title,
    description: subTask.description,
    completed: subTask.completed,
  };
}

export function toTaskDto(task: TaskDtoInput): TaskDto {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    priority: task.priority,
    status: task.status,
    createdAt: task.createdAt.toISOString(),
    updatedAt: task.updatedAt.toISOString(),
    dueDate: task.dueDate?.toISOString() ?? null,
    createdById: task.createdById,
    projectId: task.projectId,
    assigneeId: task.assigneeId,
    project: task.project ? toProjectDto(task.project) : null,
    subTasks: task.subTasks?.map(toSubTaskDto) ?? [],
  };
}
