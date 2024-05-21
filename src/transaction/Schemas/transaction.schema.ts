import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Date } from "mongoose";
import { Category } from "src/category/Schema/category.schema";
import { Tag } from "src/tags/Schema/tag.schema";

@Schema()
export class Transaction {
    
    @Prop()
    title : string ;
    @Prop()
    details : string ;
    @Prop()
    amount : number ;
    @Prop({type : Date})
    date : Date ;
    @Prop({type: mongoose.Schema.Types.ObjectId , ref : "Category"})
    category : Category ;
    @Prop()
    description : string ;
    @Prop({type: mongoose.Schema.Types.ObjectId , ref : "Tag"})
    tag : Tag ;

}
export type TransactionDocument = Transaction & Document;
export const TransactionSchema = SchemaFactory.createForClass(Transaction);

