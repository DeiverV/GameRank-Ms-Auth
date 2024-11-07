import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, TokenDto } from './dto';
import { GrpcMethod } from '@nestjs/microservices';
// import { RolesGuard } from './roles.guard';
// import { JwtGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  //@Roles('ADMIN')

  //---------- gRPC Communication

  @GrpcMethod('AuthService', 'ValidateToken')
  async validateToken({ token }: TokenDto) {
    const res = await this.authService.validateToken({ token });
    return res;
  }

  @GrpcMethod('AuthService', 'Login')
  async login(loginDto: LoginDto) {
    const res = await this.authService.login(loginDto);
    return res;
  }

  @GrpcMethod('AuthService', 'Logout')
  async logout(token: TokenDto) {
    await this.authService.logout(token);
  }
}
