import { CreateProjectInput } from "./project.schemas";
export declare function createProject(userId: number, input: CreateProjectInput): Promise<{
    id: number;
    name: string;
    userId: number;
}>;
export declare function getProjects(userId: number): Promise<{
    id: number;
    name: string;
    userId: number;
}[]>;
//# sourceMappingURL=project.service.d.ts.map