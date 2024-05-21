import { IsString } from "@nestjs/class-validator";

export class CreateTagDto {
    @IsString()
    name : string ;
    @IsString()
    description : string ;
}
