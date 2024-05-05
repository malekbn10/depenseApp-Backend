import { IsString } from "@nestjs/class-validator";

export class CreateUserDto {
    @IsString()
    fullname:string;
    @IsString()
    email:string;
    @IsString()
    password:string;
}
