import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Tag {
    @Prop({required : true})
    name : string;
    
    @Prop({required : true})
    description : string;
}
export type TagDocument = Tag & Document;
export const TagSchema = SchemaFactory.createForClass(Tag);

