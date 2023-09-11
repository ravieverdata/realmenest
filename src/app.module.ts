import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './modules/admin/admin.module';
import { typeOrmConfig } from './config/typeorm.config';
import { DashboardController } from './controller/dashboard/dashboard.controller';
import { DashboardController } from './controllers/dashboard/dashboard.controller';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { DashboardService } from './services/dashboard/dashboard.service';



@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AdminModule,
    DashboardModule,
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class AppModule {}
