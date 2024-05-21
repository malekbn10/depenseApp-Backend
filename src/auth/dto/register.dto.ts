import { IsEmail, IsString, MinLength } from "@nestjs/class-validator";
import { Transform } from "class-transformer";

export class RegisterDto{
    @IsString()
    @MinLength(4)
    fullname:string;

    @IsEmail()
    email:string;

    @IsString()
    @MinLength(6)
    @Transform(({value}) =>value.trim() )
    password:string;

}