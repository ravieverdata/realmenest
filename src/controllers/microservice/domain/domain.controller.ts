import { Get, ParseIntPipe, Param, Post, Controller, Body, Req, UseGuards, Ip, HttpException, HttpStatus, BadRequestException, NotFoundException } from '@nestjs/common';
import { AccesstokenguardGuard } from 'src/guards/admin/accesstokenguard/accesstokenguard.guard';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags, ApiBearerAuth, ApiConsumes, ApiUnauthorizedResponse } from '@nestjs/swagger';
import axios from 'axios';
import { Request } from 'express';


@Controller('microservice/domain')
@UseGuards(AccesstokenguardGuard)
export class DomainController {

    // client domains data 
    @ApiUnauthorizedResponse({ status: 401, description: "Unauthorized Admin" })
	@ApiOperation({ summary: "All Domains List of client" })
	@ApiResponse({ status: 200, description: "Api success" })
	@ApiResponse({ status: 422, description: "Bad Request or API error message" })
	@ApiResponse({ status: 404, description: "Not found!" })
	@ApiResponse({ status: 500, description: "Internal server error!" })
    @ApiResponse({ status: 400, description: "Una" })
    @Post()
    async getClientdomains(@Body() postData: any, @Req() request: Request, @Ip() ip: string): Promise<any> {

        const microhost = request['microhost'];

        try {

            const headers = {
                Authorization: `Bearer ${request['accesstoken']}`,
                'X-User-IP': ip,
            };

            const response = await axios.post(`${microhost}/domain/`, postData, {headers});
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




    // particular client domain names data 

    @ApiUnauthorizedResponse({ status: 401, description: "Unauthorized Admin" })
	@ApiOperation({ summary: "All Domains List of client" })
	@ApiResponse({ status: 200, description: "Api success" })
	@ApiResponse({ status: 422, description: "Bad Request or API error message" })
	@ApiResponse({ status: 404, description: "Not found!" })
	@ApiResponse({ status: 500, description: "Internal server error!" })
    @ApiResponse({ status: 400, description: "Una" })
    @Get('alldomains/:user')
    async getClientalldomains(@Param('user', ParseIntPipe) user: any, @Req() request: Request, @Ip() ip: string): Promise<any> {

        if (isNaN(user)) {
            // Return a BadRequestException with a custom error message for invalid 'id'
            throw new BadRequestException('Invalid ID. Please provide a valid number.');
        }

        const microhost = request['microhost'];

        try {

            const headers = {
                Authorization: `Bearer ${request['accesstoken']}`,
                'X-User-IP': ip,
            };

            const response = await axios.get(`${microhost}/domain/alldomains/${user}`, {headers});
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



    // particular domain data of client domain 

    @ApiUnauthorizedResponse({ status: 401, description: "Unauthorized Admin" })
	@ApiOperation({ summary: "All Domains List of client" })
	@ApiResponse({ status: 200, description: "Api success" })
	@ApiResponse({ status: 422, description: "Bad Request or API error message" })
	@ApiResponse({ status: 404, description: "Not found!" })
	@ApiResponse({ status: 500, description: "Internal server error!" })
    @ApiResponse({ status: 400, description: "Una" })
    @Get(':user/:id?')
    async getClientdomain(@Req() request: Request, @Ip() ip: string, @Param('user', ParseIntPipe) user: number, @Param('id') id?: number): Promise<any> {

        if (isNaN(user)) {
            // Return a BadRequestException with a custom error message for invalid 'id'
            throw new BadRequestException('Invalid ID. Please provide a valid number.');
        }

        const microhost = request['microhost'];

        try {

            const headers = {
                Authorization: `Bearer ${request['accesstoken']}`,
                'X-User-IP': ip,
            };

            const response = await axios.get(`${microhost}/domain/${user}/${id}`, {headers});
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
