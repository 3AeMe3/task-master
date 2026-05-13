import type { Project } from "@/features/projects/types/project.types";

type TaskStatus = "PENDIENTE" | "COMPLETADO" | "VENCIDO";
type TaskPriority = "BAJO" | "NORMAL" | "URGENTE";

export interface SubTask {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
}

export interface TaskComment {
  id: number;
  content: string;
  createdAt: string;
  author: {
    id: number;
    name: string;
  };
}

export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
  createdById: number;
  projectId: number;
  assigneeId: number | null;
  project: Project | null;
  subTasks: SubTask[];
  comments: TaskComment[];
}
