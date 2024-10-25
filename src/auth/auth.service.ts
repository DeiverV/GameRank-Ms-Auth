import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto';
import { JwtSignature } from './models';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  login({ password, username }: LoginDto) {
    // get user from users ms
    const user: JwtSignature = {
      id: '1f8a4f72-6e9f-42bf-a517-c68c4adfa4c8',
      name: 'John Doe',
      username: 'johndoe123',
      email: 'johndoe@example.com',
      role: 'ADMIN',
    };

    return {
      token: this.jwtService.sign({ user }),
    };
  }
}
