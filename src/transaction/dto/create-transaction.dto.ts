import { IsDate, IsNumber, IsString } from "@nestjs/class-validator";
import { Category } from "src/category/Schema/category.schema";
import { Tag } from "src/tags/Schema/tag.schema";

export class CreateTransactionDto {
    @IsString()
    title : string ;
    @IsString()
    details : string ;
    @IsNumber()
    amount : number ;
    @IsDate()
    date : Date ;
    @IsString()
    category : Category ;
    @IsString()
    description : string ;
    @IsString()
    tag : Tag ;

}
