import { asyncHandler } from "../../shared/http/async-handler.js";
import { sendSuccess } from "../../shared/http/api-response.js";
import { requireUserId } from "../../shared/http/request.js";
import { parseWithSchema } from "../../shared/http/validation.js";
import { toProjectDto } from "./project.dto.js";
import { createProject, getProjects } from "./project.service.js";
import { createProjectSchema } from "./project.schemas.js";
export const createProjectController = asyncHandler(async (req, res) => {
    const userId = requireUserId(req);
    const input = parseWithSchema(createProjectSchema, req.body);
    const project = await createProject(userId, input);
    sendSuccess(res, 201, toProjectDto(project), "Se creó el proyecto correctamente");
});
export const getProjectsController = asyncHandler(async (req, res) => {
    const userId = requireUserId(req);
    const projects = await getProjects(userId);
    sendSuccess(res, 200, projects.map(toProjectDto));
});
//# sourceMappingURL=project.controller.js.map