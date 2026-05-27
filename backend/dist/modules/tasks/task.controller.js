import { asyncHandler } from "../../shared/http/async-handler";
import { sendSuccess } from "../../shared/http/api-response";
import { requireUserId } from "../../shared/http/request";
import { parseIdParam, parseWithSchema } from "../../shared/http/validation";
import { toTaskDto } from "./task.dto";
import { addTaskTag, completeTask, createTaskComment, createSubTask, createTask, deleteTaskComment, removeTaskTag, deleteSubTask, deleteTask, editTask, findTask, getTasks, toggleSubTask, } from "./task.service";
import { createSubTaskSchema, createTaskCommentSchema, createTaskTagSchema, createTaskSchema, updateTaskSchema, } from "./task.schemas";
export const getTasksController = asyncHandler(async (req, res) => {
    const userId = requireUserId(req);
    const tasks = await getTasks(userId);
    sendSuccess(res, 200, tasks.map(toTaskDto));
});
export const createTaskController = asyncHandler(async (req, res) => {
    const userId = requireUserId(req);
    const input = parseWithSchema(createTaskSchema, req.body);
    const task = await createTask(userId, input);
    sendSuccess(res, 201, toTaskDto(task), "Tarea creada correctamente");
});
export const findTaskController = asyncHandler(async (req, res) => {
    const userId = requireUserId(req);
    const taskId = parseIdParam(req.params.id);
    const task = await findTask(userId, taskId);
    sendSuccess(res, 200, toTaskDto(task));
});
export const completeTaskController = asyncHandler(async (req, res) => {
    const userId = requireUserId(req);
    const taskId = parseIdParam(req.params.id);
    const task = await completeTask(userId, taskId);
    sendSuccess(res, 200, toTaskDto(task), "Tarea completada correctamente");
});
export const deleteTaskController = asyncHandler(async (req, res) => {
    const userId = requireUserId(req);
    const taskId = parseIdParam(req.params.id);
    const task = await deleteTask(userId, taskId);
    sendSuccess(res, 200, toTaskDto(task), "Tarea eliminada correctamente");
});
export const editTaskController = asyncHandler(async (req, res) => {
    const userId = requireUserId(req);
    const taskId = parseIdParam(req.params.id);
    const input = parseWithSchema(updateTaskSchema, req.body);
    const task = await editTask(userId, taskId, input);
    sendSuccess(res, 200, toTaskDto(task), "Tarea editada correctamente");
});
export const addTaskTagController = asyncHandler(async (req, res) => {
    const userId = requireUserId(req);
    const taskId = parseIdParam(req.params.id);
    const input = parseWithSchema(createTaskTagSchema, req.body);
    const task = await addTaskTag(userId, taskId, input);
    sendSuccess(res, 201, toTaskDto(task), "Etiqueta agregada correctamente");
});
export const removeTaskTagController = asyncHandler(async (req, res) => {
    const userId = requireUserId(req);
    const taskId = parseIdParam(req.params.id);
    const tagId = parseIdParam(req.params.tagId, "tagId");
    const task = await removeTaskTag(userId, taskId, tagId);
    sendSuccess(res, 200, toTaskDto(task), "Etiqueta eliminada correctamente");
});
export const createSubTaskController = asyncHandler(async (req, res) => {
    const userId = requireUserId(req);
    const taskId = parseIdParam(req.params.id);
    const input = parseWithSchema(createSubTaskSchema, req.body);
    const task = await createSubTask(userId, taskId, input);
    sendSuccess(res, 201, toTaskDto(task), "Subtarea creada correctamente");
});
export const toggleSubTaskController = asyncHandler(async (req, res) => {
    const userId = requireUserId(req);
    const taskId = parseIdParam(req.params.id);
    const subTaskId = parseIdParam(req.params.subTaskId, "subTaskId");
    const task = await toggleSubTask(userId, taskId, subTaskId);
    sendSuccess(res, 200, toTaskDto(task), "Subtarea actualizada correctamente");
});
export const deleteSubTaskController = asyncHandler(async (req, res) => {
    const userId = requireUserId(req);
    const taskId = parseIdParam(req.params.id);
    const subTaskId = parseIdParam(req.params.subTaskId, "subTaskId");
    const task = await deleteSubTask(userId, taskId, subTaskId);
    sendSuccess(res, 200, toTaskDto(task), "Subtarea eliminada correctamente");
});
export const createTaskCommentController = asyncHandler(async (req, res) => {
    const userId = requireUserId(req);
    const taskId = parseIdParam(req.params.id);
    const input = parseWithSchema(createTaskCommentSchema, req.body);
    const task = await createTaskComment(userId, taskId, input);
    sendSuccess(res, 201, toTaskDto(task), "Comentario creado correctamente");
});
export const deleteTaskCommentController = asyncHandler(async (req, res) => {
    const userId = requireUserId(req);
    const taskId = parseIdParam(req.params.id);
    const commentId = parseIdParam(req.params.commentId, "commentId");
    const task = await deleteTaskComment(userId, taskId, commentId);
    sendSuccess(res, 200, toTaskDto(task), "Comentario eliminado correctamente");
});
//# sourceMappingURL=task.controller.js.map