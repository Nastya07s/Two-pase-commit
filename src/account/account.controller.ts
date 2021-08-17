import AccountEntity from "./account.entity";
import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {AccountService} from "./account.service";

@Controller('/account')
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    @Get()
    public async findAll(): Promise<AccountEntity[]> {
        return this.accountService.findAll();
    }

    @Post('/:user_id')
    public async createAccount(
        @Param("user_id") userId: string,
        @Body() body,
    ): Promise<void> {
        return this.accountService.createAccount({ ...body, user_id: userId });
    }
}