import { ProjectDto } from "../projects/project.dto";
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
export declare function resolveTaskStatus(task: Pick<TaskDtoInput, "status" | "dueDate">): "PENDIENTE" | "COMPLETADO" | "VENCIDO";
export declare function toSubTaskDto(subTask: SubTaskDtoInput): SubTaskDto;
export declare function toTaskCommentDto(comment: TaskCommentDtoInput): TaskCommentDto;
export declare function toTaskTagDto(taskTag: TaskTagDtoInput): TaskTagDto;
export declare function toTaskDto(task: TaskDtoInput): TaskDto;
export {};
//# sourceMappingURL=task.dto.d.ts.map