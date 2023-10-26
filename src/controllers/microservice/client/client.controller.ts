import { Get, ParseIntPipe, Param, Post, Controller, Body, Req, UseGuards, Ip, HttpException, HttpStatus, BadRequestException, NotFoundException, Patch } from '@nestjs/common';
import { AccesstokenguardGuard } from 'src/guards/admin/accesstokenguard/accesstokenguard.guard';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags, ApiBearerAuth, ApiConsumes, ApiUnauthorizedResponse } from '@nestjs/swagger';
import axios from 'axios';
import { Request } from 'express';


@Controller('microservice/client')
@UseGuards(AccesstokenguardGuard)
export class ClientController {

    // all clients list data 
   
    @ApiUnauthorizedResponse({ status: 401, description: "Unauthorized Admin" })
	@ApiOperation({ summary: "All Clients List" })
	@ApiResponse({ status: 200, description: "Api success" })
	@ApiResponse({ status: 422, description: "Bad Request or API error message" })
	@ApiResponse({ status: 404, description: "Not found!" })
	@ApiResponse({ status: 409, description: "User Already Exist" })
	@ApiResponse({ status: 500, description: "Internal server error!" })
    @ApiResponse({ status: 400, description: "Una" })
    @Post('clients')
    async clients(@Body() postData: any, @Req() request: Request, @Ip() ip: string): Promise<any> {

        const microhost = request['microhost'];

        try {

            const headers = {
                Authorization: `Bearer ${request['accesstoken']}`,
                'X-User-IP': ip,
            };
          
            const response = await axios.post(`${microhost}/client/`, postData, {headers});
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



    // particular client data with id 
    @ApiUnauthorizedResponse({ status: 401, description: "Unauthorized Admin" })
	@ApiOperation({ summary: "Client Data" })
	@ApiResponse({ status: 200, description: "Api success" })
	@ApiResponse({ status: 422, description: "Bad Request or API error message" })
	@ApiResponse({ status: 404, description: "Not found!" })
	@ApiResponse({ status: 409, description: "User Already Exist" })
	@ApiResponse({ status: 500, description: "Internal server error!" })
    @ApiResponse({ status: 400, description: "Una" })
    @Get(':id')
    async client(@Param('id', ParseIntPipe) id: number,  @Req() request: Request,  @Ip() ip: string): Promise<any> {

        if (isNaN(id)) {
            // Return a BadRequestException with a custom error message for invalid 'id'
            throw new BadRequestException('Invalid ID. Please provide a valid number.');
        }

        const microhost = request['microhost'];

        try {

            const headers = {
                Authorization: `Bearer ${request['accesstoken']}`,
                'X-User-IP': ip,
            };

            const response = await axios.get(`${microhost}/client/${id}`, {headers});
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



    // particular client History data with id 
    @ApiUnauthorizedResponse({ status: 401, description: "Unauthorized Admin" })
	@ApiOperation({ summary: "Client Login History Data" })
	@ApiResponse({ status: 200, description: "Api success" })
	@ApiResponse({ status: 422, description: "Bad Request or API error message" })
	@ApiResponse({ status: 404, description: "Not found!" })
	@ApiResponse({ status: 500, description: "Internal server error!" })
    @ApiResponse({ status: 400, description: "Una" })
    @Get('loginhistory/:id')
    async loginhistory(@Param('id', ParseIntPipe) id: number,  @Req() request: Request, @Ip() ip: string): Promise<any> {

        if (isNaN(id)) {
            // Return a BadRequestException with a custom error message for invalid 'id'
            throw new BadRequestException('Invalid ID. Please provide a valid number.');
        }

        const microhost = request['microhost'];

        try {

            const headers = {
                Authorization: `Bearer ${request['accesstoken']}`,
                'X-User-IP': ip,
            };

            const response = await axios.get(`${microhost}/client/loginhistory/${id}`, {headers});
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



    // client data update  
   
    @ApiUnauthorizedResponse({ status: 401, description: "Unauthorized Admin" })
	@ApiOperation({ summary: "Client Data Update" })
	@ApiResponse({ status: 200, description: "Api success" })
	@ApiResponse({ status: 422, description: "Bad Request or API error message" })
	@ApiResponse({ status: 404, description: "Not found!" })
	@ApiResponse({ status: 409, description: "User Already Exist" })
	@ApiResponse({ status: 500, description: "Internal server error!" })
    @ApiResponse({ status: 400, description: "Una" })
    @Patch('update')
    async updateclient(@Body() postData: any, @Req() request: Request, @Ip() ip: string): Promise<any> {

        const microhost = request['microhost'];

        try {

            const headers = {
                Authorization: `Bearer ${request['accesstoken']}`,
                'X-User-IP': ip,
            };
          
            const response = await axios.patch(`${microhost}/client/update`, postData, {headers});
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
