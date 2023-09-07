import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidOtpException extends HttpException {
  constructor() {
    super('Invalid OTP', HttpStatus.UNAUTHORIZED);
  }
}
