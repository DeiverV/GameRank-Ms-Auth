import { Role } from "./roles.model";

export interface JwtSignature {
  id: string;
  name: string;
  username: string;
  email: string;
  role: Role;
}
