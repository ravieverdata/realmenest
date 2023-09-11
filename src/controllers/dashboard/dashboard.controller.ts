import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/guards/admin/admin.guard';
import { DashboardService } from 'src/services/dashboard/dashboard.service';
import { DashboardEntity } from 'src/modules/dashboard/dashboard.entity';
import { DashboardTicketsEntity } from 'src/modules/dashboard/dashboardtickets.entity';

@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController {
    constructor(private dashboardService: DashboardService) {}

    @UseGuards(AdminGuard)
    @Get('/')
    @ApiResponse({ status: 200, description: "Api success" })
	@ApiResponse({ status: 422, description: "Bad Request or API error message" })
	@ApiResponse({ status: 404, description: "Not found!" })
    async dashboarddata(): Promise<DashboardEntity[]> {
        return this.dashboardService.getdashboarddata();
    }

    @UseGuards(AdminGuard)
    @Get('/ticketscount')
    @ApiResponse({ status: 200, description: "Api success" })
	@ApiResponse({ status: 422, description: "Bad Request or API error message" })
	@ApiResponse({ status: 404, description: "Not found!" })
    async getdashboardtickets(): Promise<DashboardTicketsEntity[]> {
        return this.dashboardService.getdashboardtickets();
    }
    
}
