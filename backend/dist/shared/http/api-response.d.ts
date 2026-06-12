import { Response } from "express";
export type ApiSuccessResponse<T> = {
    success: true;
    data: T;
    message?: string;
};
export type ApiErrorResponse = {
    success: false;
    error: {
        message: string;
        details?: unknown;
    };
};
export declare function sendSuccess<T>(res: Response, statusCode: number, data: T, message?: string): Response<any, Record<string, any>>;
//# sourceMappingURL=api-response.d.ts.map