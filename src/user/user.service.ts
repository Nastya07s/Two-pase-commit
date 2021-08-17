import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { User } from './user.schema';
import {UserRepository} from "./user.repository";

@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository,
    ) {}

    public async findAll(): Promise<User[]> {
        return this.userRepository.findAll();
    }
}