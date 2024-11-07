export interface UserBase {
  id: string;
  name: string;
  username: string;
  email: string;
  image: string;
}

export interface ValidateUserDto {
  email: string;
  password: string;
}

export interface User extends UserBase {
  password: string;
  role: string;
  isBlocked: boolean;
  isActive: boolean;
}

export interface UsersService {
  validateUser(request: ValidateUserDto): Promise<User>;
}
