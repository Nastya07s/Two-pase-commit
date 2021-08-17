import { Module } from '@nestjs/common';
import AccountEntity from "./account.entity";
import {AccountService} from "./account.service";
import {AccountRepository} from "./account.repository";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AccountController} from "./account.controller";

@Module({
    imports: [TypeOrmModule.forFeature([AccountEntity])],
    providers: [AccountService, AccountRepository],
    controllers: [AccountController],
    exports: [AccountService]
})
export class AccountModule {}