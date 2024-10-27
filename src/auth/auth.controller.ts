import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from './dto';
import { GrpcMethod } from '@nestjs/microservices';
import { RolesGuard } from './roles.guard';
import { JwtGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  //@Roles('ADMIN')

  //---------- gRPC Communication

  @GrpcMethod('AuthService', 'ValidateToken')
  @UseGuards(JwtGuard, RolesGuard)
  validateToken(@Body() { token }: { token: string }) {
    return this.authService.validateToken({ token });
  }

  //---------- REST Communication

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() createUserDto: CreateUserDto) {
    this.authService.register(createUserDto);
  }
}
