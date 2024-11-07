import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, TokenDto } from './dto';
import { JwtSignature, Role } from './models';
import { createClient, RedisClientType } from 'redis';
import { ConfigService } from '@nestjs/config';
import { ClientGrpc } from '@nestjs/microservices';
import { UsersService } from './interfaces/user.service';

@Injectable()
export class AuthService {
  private redisClient: RedisClientType;
  private usersService: UsersService;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject('USERS_PACKAGE') private readonly grpcClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.redisClient = createClient({
      url: `redis://${this.configService.get('REDIS_HOST')}:${this.configService.get('REDIS_PORT')}`,
    });

    this.redisClient.connect();

    this.usersService =
      this.grpcClient.getService<UsersService>('UsersService');
  }

  async validateToken({ token }: { token: string }) {
    const res = await this.redisClient.get(token);
    return res;
  }

  async login({ password, email }: LoginDto) {
    const user = await this.usersService.validateUser({ password, email });

    const userSign: JwtSignature = {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role as Role,
    };

    const token = this.jwtService.sign({ userSign });

    await this.redisClient.set(token, user.role, {
      EX: this.configService.get('JWT_EXPIRES_IN'),
    });

    return { token };
  }

  async logout({ token }: TokenDto) {
    return await this.redisClient.del(token);
  }
}
