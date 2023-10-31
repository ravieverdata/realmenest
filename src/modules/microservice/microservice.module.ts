import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { VerifyserviceMiddleware } from 'src/middleware/microservice/verifyservice/verifyservice.middleware';
import { ClientController } from 'src/controllers/microservice/client/client.controller';
import { HostingController } from 'src/controllers/microservice/hosting/hosting.controller';
import { DomainController } from 'src/controllers/microservice/domain/domain.controller';
import { BillingController } from 'src/controllers/microservice/billing/billing.controller';

@Module({
  controllers: [ClientController, HostingController, DomainController, BillingController],
})
export class Microservicemodule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyserviceMiddleware)
      .forRoutes(ClientController, HostingController, DomainController, BillingController);
  }
}