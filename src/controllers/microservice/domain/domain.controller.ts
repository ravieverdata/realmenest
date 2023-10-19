import { Get, ParseIntPipe, Param, Post, Controller, Body, Req, UseGuards, Ip, HttpException, HttpStatus, BadRequestException, NotFoundException } from '@nestjs/common';
import { AccesstokenguardGuard } from 'src/guards/admin/accesstokenguard/accesstokenguard.guard';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags, ApiBearerAuth, ApiConsumes, ApiUnauthorizedResponse } from '@nestjs/swagger';
import axios from 'axios';
import { Request } from 'express';


@Controller('microservice/domain')
@UseGuards(AccesstokenguardGuard)
export class DomainController {

    // all clients list data 
    @ApiUnauthorizedResponse({ status: 401, description: "Unauthorized Admin" })
	@ApiOperation({ summary: "All Domains List of client" })
	@ApiResponse({ status: 200, description: "Api success" })
	@ApiResponse({ status: 422, description: "Bad Request or API error message" })
	@ApiResponse({ status: 404, description: "Not found!" })
	@ApiResponse({ status: 500, description: "Internal server error!" })
    @ApiResponse({ status: 400, description: "Una" })
    @Post()
    async getClientdomains(@Body() postData: any, @Req() request: Request): Promise<any> {

        const microhost = request['microhost'];

        try {
            const response = await axios.post(`${microhost}/domain/`, postData);
            // Handle the successful response
            return response.data;

        } catch (error) {

            // Handle the error using the custom error-handling function

            if (error.response) {
                // The error has a response, indicating it's an HTTP error response from the microservice
                const errorResponse = error.response;
                throw errorResponse.data; // Re-throw the error to propagate it to the caller
            } else {
                console.error(error.message);
                throw { message: 'An error occurred while communicating with the server.' }; // Re-throw a custom error
            }
        }
    }

}
