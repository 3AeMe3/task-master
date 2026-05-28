import { isBefore, startOfDay } from "date-fns";
import { toProjectDto } from "../projects/project.dto.js";
export function resolveTaskStatus(task) {
    if (task.status === "COMPLETADO") {
        return "COMPLETADO";
    }
    if (!task.dueDate) {
        return "PENDIENTE";
    }
    return isBefore(startOfDay(task.dueDate), startOfDay(new Date())) ? "VENCIDO" : "PENDIENTE";
}
export function toSubTaskDto(subTask) {
    return {
        id: subTask.id,
        title: subTask.title,
        description: subTask.description,
        completed: subTask.completed,
    };
}
export function toTaskCommentDto(comment) {
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
export function toTaskTagDto(taskTag) {
    return {
        id: taskTag.tag.id,
        name: taskTag.tag.name,
    };
}
export function toTaskDto(task) {
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
//# sourceMappingURL=task.dto.js.map