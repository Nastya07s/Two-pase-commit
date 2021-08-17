import {Controller, Get} from '@nestjs/common';
import {UserService} from "./user.service";
import {User} from "./user.schema";

@Controller('/')
export class UserController {
    constructor(private readonly userService: UserService) {}
    
    @Get()
    public findAll(): Promise<User[]> {
        return this.userService.findAll();
    }
}