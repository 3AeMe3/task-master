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

export function toProjectDto(project: ProjectDtoInput): ProjectDto {
  return {
    id: project.id,
    name: project.name,
    userId: project.userId,
    description: null,
  };
}
