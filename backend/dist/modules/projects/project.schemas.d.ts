import { z } from "zod";
export declare const createProjectSchema: z.ZodObject<{
    name: z.ZodString;
}, z.core.$strip>;
export type CreateProjectInput = z.infer<typeof createProjectSchema>;
//# sourceMappingURL=project.schemas.d.ts.map