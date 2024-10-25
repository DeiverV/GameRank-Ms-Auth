import { SetMetadata } from '@nestjs/common';
import { Role } from './models/roles.model';

export const Roles = (roles: Role[]) => SetMetadata('roles', roles);
