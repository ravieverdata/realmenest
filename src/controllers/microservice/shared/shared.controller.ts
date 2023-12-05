import { Get, ParseIntPipe, Param, Post, Controller, Body, Req, UseGuards, Ip, HttpException, HttpStatus, BadRequestException, NotFoundException } from '@nestjs/common';
import { AccesstokenguardGuard } from 'src/guards/admin/accesstokenguard/accesstokenguard.guard';
import { ApiHeader, ApiOperation, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
//import axios from 'axios';
import { Request } from 'express';
import { sendRequestGet } from 'src/shared/utility/axiosUtility';


@Controller('microservice/shared')
@UseGuards(AccesstokenguardGuard)
export class SharedController {

    // client domains data 
    @ApiUnauthorizedResponse({ status: 401, description: "Unauthorized Admin" })
	@ApiOperation({ summary: "Search Data" })
	@ApiResponse({ status: 200, description: "Api success" })
	@ApiResponse({ status: 422, description: "Bad Request or API error message" })
	@ApiResponse({ status: 404, description: "Not found!" })
	@ApiResponse({ status: 500, description: "Internal server error!" })
    @ApiResponse({ status: 400, description: "Una" })
    @Get('search/:data')
    async getSearch(@Param('data') data: any, @Req() request: Request, @Ip() ip: string): Promise<any> {

        try {
            const response = await sendRequestGet(`/search/${data}`, request, ip);
            // Handle the successful response
            return response;
        } catch (error) {
            // Handle the error
            console.error('Error:', error.message);
            return { error: 'An error occurred.' };
        }
      
    }
}
