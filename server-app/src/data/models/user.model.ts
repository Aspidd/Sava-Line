import { Schema } from "@nestjs/mongoose";


@Schema({collection:'usersStore',versionKey:false})

export class User{
    _id:string;
    name:string;
    surname:string;
    phoneNumber:string;
    email:string;
    passwordHash:string;
    avatar:string;
    role:UserRole;
    isBlocked:false;
    isDeleted:false;
    favorites:string[];
}
