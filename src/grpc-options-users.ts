import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'users',
    url: 'localhost:50051',
    protoPath: join(__dirname, 'protos/users.proto'),
  }
}