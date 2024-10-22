import { BadRequestException, Controller, Get, Ip, Param, ParseIntPipe, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import axios from 'axios';
import { AccesstokenguardGuard } from 'src/guards/admin/accesstokenguard/accesstokenguard.guard';


@Controller('microservice/email')
@UseGuards(AccesstokenguardGuard)
export class EmailController {


    // particular Email data 

    @ApiUnauthorizedResponse({ status: 401, description: "Unauthorized Admin" })
	@ApiOperation({ summary: "Particular Email" })
	@ApiResponse({ status: 200, description: "Api success" })
	@ApiResponse({ status: 422, description: "Bad Request or API error message" })
	@ApiResponse({ status: 404, description: "Not found!" })
	@ApiResponse({ status: 500, description: "Internal server error!" })
    @ApiResponse({ status: 400, description: "Una" })
    @Get(':id')
    async getClienthosting(@Req() request: Request, @Ip() ip: string, @Param('id', ParseIntPipe) id: number): Promise<any> {

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

            const response = await axios.get(`${microhost}/email/${id}`, {headers});
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
