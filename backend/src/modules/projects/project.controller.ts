import { Request, Response } from "express";

import { asyncHandler } from "../../shared/http/async-handler";
import { sendSuccess } from "../../shared/http/api-response";
import { requireUserId } from "../../shared/http/request";
import { parseWithSchema } from "../../shared/http/validation";
import { toProjectDto } from "./project.dto";
import { createProject, getProjects } from "./project.service";
import { createProjectSchema } from "./project.schemas";

export const createProjectController = asyncHandler(async (req: Request, res: Response) => {
  const userId = requireUserId(req);
  const input = parseWithSchema(createProjectSchema, req.body);
  const project = await createProject(userId, input);

  sendSuccess(
    res,
    201,
    toProjectDto(project),
    "Se creó el proyecto correctamente",
  );
});

export const getProjectsController = asyncHandler(async (req: Request, res: Response) => {
  const userId = requireUserId(req);
  const projects = await getProjects(userId);

  sendSuccess(
    res,
    200,
    projects.map(toProjectDto),
  );
});
