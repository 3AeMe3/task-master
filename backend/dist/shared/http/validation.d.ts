import { z } from "zod";
export declare function parseWithSchema<TSchema extends z.ZodTypeAny>(schema: TSchema, input: unknown): z.infer<TSchema>;
export declare function parseIdParam(value: string | string[] | undefined, field?: string): number;
//# sourceMappingURL=validation.d.ts.map