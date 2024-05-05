import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity()
export class User {
    @ObjectIdColumn()
    id: ObjectId;
    @Column()
    fullname:string;
    @Column()
    email:string;
    @Column()
    password:string;
}
