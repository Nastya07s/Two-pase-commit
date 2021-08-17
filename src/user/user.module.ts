import { Module } from '@nestjs/common';
import {UserService} from "./user.service";
import {UserRepository} from "./user.repository";
import {UserController} from "./user.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./user.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], 'store'),],
    providers: [UserService, UserRepository],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule {}