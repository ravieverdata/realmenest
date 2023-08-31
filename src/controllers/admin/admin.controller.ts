import { Get, ParseIntPipe, Param, Post, Controller, Body, Request, UseGuards } from '@nestjs/common';
import { AdminService } from 'src/services/admin/admin.service';
import { AdminEntity } from '../../modules/admin/admin.entity';
import { AdminDto } from 'src/dtos/admin/admin.dto';
import { AdminGuard } from 'src/guards/admin/admin.guard';



@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) {}

    //@UseGuards(AdminGuard)
    @Get('users')
    getUsers() {
        return this.adminService.getAllUsers();
        console.log('racvi sharma');
    }

    @UseGuards(AdminGuard)
    @Get('allusers')
    async findAll(): Promise<AdminEntity[]> {
        return await this.adminService.getAllUsers();
    }

    @Get(':id')
    async getuser(@Param('id', ParseIntPipe) id: number): Promise<AdminEntity> {
        return await this.adminService.getuser(id);
    }

    // @Post('login')
    // async login(@Body() adminDto: AdminDto): Promise<AdminEntity> {
    //     return await this.adminService.login();
    // } 

    @Get('test')
    getUsersold() {
        return this.adminService.logTableData();
    }

    @Post('login')
    async login(@Body() adminDto: AdminDto, @Request() request: Request): Promise<{ accessToken: string }> {
        //console.log(adminDto.un, "hello ravi");
        return this.adminService.login(adminDto.un, adminDto.ps);
    }
}
