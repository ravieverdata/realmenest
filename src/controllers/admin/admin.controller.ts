import { Get, ParseIntPipe, Param, Post, Controller, Body, Request, UseGuards } from '@nestjs/common';
import { AdminService } from 'src/services/admin/admin.service';
import { AdminEntity } from '../../modules/admin/admin.entity';
import { AdminDto } from 'src/dtos/admin/admin.dto';
import { OtpDto } from 'src/dtos/admin/otp.dto';
import { AdminGuard } from 'src/guards/admin/admin.guard';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags, ApiBearerAuth, ApiConsumes, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { RealIP } from 'nestjs-real-ip';
import { AccesstokenguardGuard } from 'src/guards/admin/accesstokenguard/accesstokenguard.guard';


@ApiTags('Admin')
@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) {}

    //@UseGuards(AdminGuard)
    @Get('users')
    @UseGuards(AdminGuard)
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({ status: 401, description: "Unauthorized Admin" })
	@ApiOperation({ summary: "Add New User" })
	@ApiResponse({ status: 200, description: "Api success" })
	@ApiResponse({ status: 422, description: "Bad Request or API error message" })
	@ApiResponse({ status: 404, description: "Not found!" })
	@ApiResponse({ status: 409, description: "User Already Exist" })
	@ApiResponse({ status: 500, description: "Internal server error!" })
    getUsers() {
        return this.adminService.getAllUsers();
    }

    @UseGuards(AdminGuard)
    @UseGuards(AccesstokenguardGuard)
    @Get('allusers')
    async findAll(@Request() request: Request): Promise<AdminEntity[]> {
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

    @ApiResponse({ status: 200, description: "Api success" })
	@ApiResponse({ status: 422, description: "Bad Request or API error message" })
	@ApiResponse({ status: 404, description: "Not found!" })
    @ApiResponse({ status: 401, description: "Incorrect Password or Unautorized" })
    @Post('login')
    async login(@Body() adminDto: AdminDto, @Request() request: Request, @RealIP() ip: string): Promise<{ accessToken: string,  otp: boolean}> {
        return this.adminService.login(adminDto.un, adminDto.ps, ip);
    }


    
    @UseGuards(AdminGuard)
    @Post('otpverify')
    @ApiResponse({ status: 200, description: "Api success" })
	@ApiResponse({ status: 422, description: "Bad Request or API error message" })
	@ApiResponse({ status: 404, description: "Not found!" })
    @ApiResponse({ status: 401, description: "Incorrect otp or Unautorized " })
    async otpverify(@Body() otpDto: OtpDto, @Request() request: Request, @RealIP() ip: string): Promise<{ accessToken: string,  success: boolean}> {
        return this.adminService.otpverify(otpDto.otp, ip, request);
    }


    @UseGuards(AdminGuard)
    @UseGuards(AccesstokenguardGuard)
    @Get('admindetails')
    @ApiResponse({ status: 200, description: "Api success" })
	@ApiResponse({ status: 422, description: "Bad Request or API error message" })
	@ApiResponse({ status: 404, description: "Not found!" })
    async admindetails(@Request() request: Request): Promise<AdminEntity> {
        return this.adminService.admindetails(request);
    }
}
