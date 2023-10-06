import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { VerifyserviceMiddleware } from 'src/middleware/microservice/verifyservice/verifyservice.middleware';
import { ClientController } from 'src/controllers/microservice/client/client.controller';

@Module({
  controllers: [ClientController],
})
export class Microservicemodule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyserviceMiddleware)
      .forRoutes(ClientController);
  }
}