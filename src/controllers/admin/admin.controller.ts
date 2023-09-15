import { Get, ParseIntPipe, Param, Post, Controller, Body, Request, UseGuards } from '@nestjs/common';
import { AdminService } from 'src/services/admin/admin.service';
import { AdminEntity } from '../../modules/admin/admin.entity';
import { AdminDto } from 'src/dtos/admin/admin.dto';
import { OtpDto } from 'src/dtos/admin/otp.dto';
import { AdminGuard } from 'src/guards/admin/admin.guard';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags, ApiBearerAuth, ApiConsumes, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { RealIP } from 'nestjs-real-ip';
import { AccesstokenguardGuard } from 'src/guards/admin/accesstokenguard/accesstokenguard.guard';
import { IntegerType } from 'typeorm';


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


    // get all admin list 
    @Get('allusers')
    @UseGuards(AdminGuard)
    @UseGuards(AccesstokenguardGuard)
    @ApiResponse({ status: 200, description: "Api success" })
	@ApiResponse({ status: 422, description: "Bad Request or API error message" })
	@ApiResponse({ status: 404, description: "Not found!" })
	@ApiResponse({ status: 500, description: "Internal server error!" })
    async findAll(@Request() request: Request): Promise<AdminEntity[]> {
        return await this.adminService.getAllUsers();
    }

    // @Get(':id')
    // async getuser(@Param('id', ParseIntPipe) id: number): Promise<AdminEntity> {
    //     return await this.adminService.getuser(id);
    // }

    // login first step

    @ApiResponse({ status: 200, description: "Api success" })
	@ApiResponse({ status: 422, description: "Bad Request or API error message" })
	@ApiResponse({ status: 404, description: "Not found!" })
    @ApiResponse({ status: 401, description: "Incorrect Password or Unautorized" })
	@ApiResponse({ status: 500, description: "Internal server error!" })
    @Post('login')
    async login(@Body() adminDto: AdminDto, @Request() request: Request, @RealIP() ip: string): Promise<{ accessToken: string,  otp: boolean}> {
        return this.adminService.login(adminDto.un, adminDto.ps, ip);
    }


    // otp verification concept
    @UseGuards(AdminGuard)
    @Post('otpverify')
    @ApiResponse({ status: 200, description: "Api success" })
	@ApiResponse({ status: 422, description: "Bad Request or API error message" })
	@ApiResponse({ status: 404, description: "Not found!" })
    @ApiResponse({ status: 401, description: "Incorrect otp or Unautorized " })
    @ApiResponse({ status: 500, description: "Internal server error!" })
    async otpverify(@Body() otpDto: OtpDto, @Request() request: Request, @RealIP() ip: string): Promise<{ accessToken: string,  success: boolean, user: object, redirect: string}> {
        return this.adminService.otpverify(otpDto.otp, ip, request);
    }


    // get login user details
    @UseGuards(AdminGuard)
    @UseGuards(AccesstokenguardGuard)
    @Get('admindetails')
    @ApiResponse({ status: 200, description: "Api success" })
	@ApiResponse({ status: 422, description: "Bad Request or API error message" })
	@ApiResponse({ status: 404, description: "Not found!" })
    @ApiResponse({ status: 500, description: "Internal server error!" })
    async admindetails(@Request() request: Request): Promise<AdminEntity> {
        return this.adminService.admindetails(request);
    }
}
