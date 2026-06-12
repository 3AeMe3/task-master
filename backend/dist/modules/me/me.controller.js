import { asyncHandler } from "../../shared/http/async-handler.js";
import { sendSuccess } from "../../shared/http/api-response.js";
import { requireUserId } from "../../shared/http/request.js";
import { toCurrentUserDto } from "./me.dto.js";
import { getMe } from "./me.service.js";
export const getMeController = asyncHandler(async (req, res) => {
    const userId = requireUserId(req);
    const user = await getMe(userId);
    sendSuccess(res, 200, toCurrentUserDto(user));
});
//# sourceMappingURL=me.controller.js.map