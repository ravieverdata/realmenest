import { Get, ParseIntPipe, Param, Post, Controller, Body, Req, UseGuards, Ip, HttpException, HttpStatus, BadRequestException, NotFoundException } from '@nestjs/common';
import { AccesstokenguardGuard } from 'src/guards/admin/accesstokenguard/accesstokenguard.guard';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags, ApiBearerAuth, ApiConsumes, ApiUnauthorizedResponse } from '@nestjs/swagger';
import axios from 'axios';
import { Request } from 'express';


@Controller('microservice/billing')
@UseGuards(AccesstokenguardGuard)
export class BillingController {

    // constructor(){
    //     console.log('helolo');
    // }

    // client Transactions data 
    @ApiUnauthorizedResponse({ status: 401, description: "Unauthorized Admin" })
	@ApiOperation({ summary: "All Transactions List of client" })
	@ApiResponse({ status: 200, description: "Api success" })
	@ApiResponse({ status: 422, description: "Bad Request or API error message" })
	@ApiResponse({ status: 404, description: "Not found!" })
	@ApiResponse({ status: 500, description: "Internal server error!" })
    @ApiResponse({ status: 400, description: "" })
    @Post('transactions')
    async getClienttransactions(@Body() postData: any, @Req() request: Request, @Ip() ip: string): Promise<any> {

        const microhost = request['microhost'];

        try {

            const headers = {
                Authorization: `Bearer ${request['accesstoken']}`,
                'X-User-IP': ip,
            };

            const response = await axios.post(`${microhost}/billing/transactions`, postData, {headers});
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



    // client Balance
    @ApiUnauthorizedResponse({ status: 401, description: "Unauthorized Admin" })
	@ApiOperation({ summary: "Get Client Balance" })
	@ApiResponse({ status: 200, description: "Api success" })
	@ApiResponse({ status: 422, description: "Bad Request or API error message" })
	@ApiResponse({ status: 404, description: "Not found!" })
	@ApiResponse({ status: 500, description: "Internal server error!" })
    @ApiResponse({ status: 400, description: "" })
    @Post('balance')
    async getClientbalance(@Body() postData: any, @Req() request: Request, @Ip() ip: string): Promise<any> {

        const microhost = request['microhost'];

        try {

            const headers = {
                Authorization: `Bearer ${request['accesstoken']}`,
                'X-User-IP': ip,
            };

            const response = await axios.post(`${microhost}/billing/balance`, postData, {headers});
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