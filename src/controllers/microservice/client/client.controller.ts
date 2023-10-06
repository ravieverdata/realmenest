import { Get, ParseIntPipe, Param, Post, Controller, Body, Req, UseGuards, Ip, HttpException, HttpStatus } from '@nestjs/common';
import { AccesstokenguardGuard } from 'src/guards/admin/accesstokenguard/accesstokenguard.guard';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags, ApiBearerAuth, ApiConsumes, ApiUnauthorizedResponse } from '@nestjs/swagger';
import axios from 'axios';
import { Request } from 'express';


@Controller('microservice/client')
export class ClientController {



    // all clients list data 
    @UseGuards(AccesstokenguardGuard)
    @ApiUnauthorizedResponse({ status: 401, description: "Unauthorized Admin" })
	@ApiOperation({ summary: "All Clients List" })
	@ApiResponse({ status: 200, description: "Api success" })
	@ApiResponse({ status: 422, description: "Bad Request or API error message" })
	@ApiResponse({ status: 404, description: "Not found!" })
	@ApiResponse({ status: 409, description: "User Already Exist" })
	@ApiResponse({ status: 500, description: "Internal server error!" })
    @ApiResponse({ status: 400, description: "Una" })
    @Post('clients')
    async clients(@Body() postData: any, @Req() request: Request): Promise<any> {
        try {
            // get the requested microservice host
            const microhost = request['microhost'];
            const response = await axios.post(`${microhost}/client`, postData);
            if (response.status >= 400) {
                throw new HttpException(response.data, response.status);
            }
            return response.data;
        } catch (error) {
            throw new HttpException({ message: error.message }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
