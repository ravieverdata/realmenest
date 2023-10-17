import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './modules/admin/admin.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { Microservicemodule } from './modules/microservice/microservice.module';
import { HostingController } from './controllers/microservice/hosting/hosting.controller';
import configuration from './config/configuration';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true,
    },),
    TypeOrmModule.forRoot({
      host: process.env.PRIMARYDATABASE_HOST,
      port: parseInt(process.env.PRIMARYDATABASE_PORT, 10) || 5432,
      type: 'mysql',
      username: process.env.PRIMARYDATABASE_USERNAME,
      password: '',
      database: process.env.PRIMARYDATABASE_NAME,
      //logging:true,
      cache: true,
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    AdminModule,
    DashboardModule,
    Microservicemodule,
  ],
  controllers: [HostingController],
  providers: [],
})
export class AppModule {}
