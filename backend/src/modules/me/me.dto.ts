type CurrentUserDtoInput = {
  id: number;
  name: string;
  email: string;
};

export type CurrentUserDto = {
  id: number;
  name: string;
  email: string;
};

export function toCurrentUserDto(user: CurrentUserDtoInput): CurrentUserDto {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}
