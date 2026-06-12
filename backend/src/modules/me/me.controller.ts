import { Request, Response } from "express";

import { asyncHandler } from "../../shared/http/async-handler";
import { sendSuccess } from "../../shared/http/api-response";
import { requireUserId } from "../../shared/http/request";
import { toCurrentUserDto } from "./me.dto";
import { getMe } from "./me.service";

export const getMeController = asyncHandler(async (req: Request, res: Response) => {
  const userId = requireUserId(req);
  const user = await getMe(userId);

  sendSuccess(res, 200, toCurrentUserDto(user));
});
