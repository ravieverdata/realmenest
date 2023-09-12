import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './modules/admin/admin.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { typeOrmConfig } from './config/typeorm.config';



@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AdminModule,
    DashboardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
