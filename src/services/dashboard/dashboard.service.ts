import { BadRequestException, Injectable, NotFoundException, UnauthorizedException, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IntegerType, Repository, MoreThanOrEqual } from 'typeorm';
import { DashboardEntity } from 'src/modules/dashboard/dashboard.entity';
import { DashboardTicketsEntity } from 'src/modules/dashboard/dashboardtickets.entity';


@Injectable()
export class DashboardService {
    constructor(
        @InjectRepository(DashboardEntity)
        private readonly dashboardentity: Repository<DashboardEntity>,
        @InjectRepository(DashboardTicketsEntity)
        private readonly dashboardticketsentity: Repository<DashboardTicketsEntity>,
        //private jwtService: JwtService,
      ) {}

    async getdashboarddata(): Promise<DashboardEntity[]> {
        return await this.dashboardentity.find();
    }

    async getdashboardtickets(): Promise<DashboardTicketsEntity[]> {
        return await this.dashboardticketsentity.find();
    }

}
