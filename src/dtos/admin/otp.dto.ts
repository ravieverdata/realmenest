import { IsNotEmpty, IsString, MinLength, MaxLength  } from "class-validator";

export class OtpDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(4)
    readonly otp: string;

}