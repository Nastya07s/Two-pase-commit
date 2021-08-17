import AccountEntity from "./account.entity";
import {Injectable} from "@nestjs/common";
import {AccountRepository} from "./account.repository";

@Injectable()
export class AccountService {
    constructor(
        private readonly accountRepository: AccountRepository,
    ) {}

    public async findAll(): Promise<AccountEntity[]> {
        return this.accountRepository.findAll();
    }

    public async createAccount(payload): Promise<void> {
        await this.accountRepository.createAccount(payload);
    }
}