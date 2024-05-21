import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {
    @Prop()
    fullname: string;
    @Prop({lowercase: true, unique: true })
    email: string;
    @Prop()
    password: string;
    @Prop()
    age: number;
    
}
export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
