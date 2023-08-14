import { IsNotEmpty, IsString  } from "class-validator";

export class AdminDto {
    @IsNotEmpty()
    @IsString()
    un: string;
  
    @IsNotEmpty()
    @IsString()
    ps: string;
  }