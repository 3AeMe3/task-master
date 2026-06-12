type ProjectDtoInput = {
    id: number;
    name: string;
    userId: number;
};
export type ProjectDto = {
    id: number;
    name: string;
    userId: number;
    description: string | null;
};
export declare function toProjectDto(project: ProjectDtoInput): ProjectDto;
export {};
//# sourceMappingURL=project.dto.d.ts.map