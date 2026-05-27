export function sendSuccess(res, statusCode, data, message) {
    const payload = {
        success: true,
        data,
        ...(message ? { message } : {}),
    };
    return res.status(statusCode).json(payload);
}
//# sourceMappingURL=api-response.js.map