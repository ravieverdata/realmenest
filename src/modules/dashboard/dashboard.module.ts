import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardEntity } from './dashboard.entity';
import { DashboardTicketsEntity } from './dashboardtickets.entity';
import { DashboardController } from 'src/controllers/dashboard/dashboard.controller';
import { DashboardService } from 'src/services/dashboard/dashboard.service';

@Module({
    imports: [TypeOrmModule.forFeature([DashboardEntity, DashboardTicketsEntity]),],
    controllers: [DashboardController],
    providers: [DashboardService],
})
export class DashboardModule {}
