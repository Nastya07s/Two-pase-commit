import AccountEntity from "./account.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Injectable} from "@nestjs/common";
import {Connection, Repository} from "typeorm";

@Injectable()
export class AccountRepository {
    constructor(
        @InjectRepository(AccountEntity)
        private readonly accountRepository: Repository<AccountEntity>,
        private connection: Connection
    ) {}

    public async findAll(): Promise<AccountEntity[]> {
        return this.accountRepository.find();
    }

    public async createAccount(payload): Promise<void> {
                const queryRunner = this.connection.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            payload.amount++;
            const account = this.accountRepository.create(payload);
            await this.accountRepository.save(account);

            await queryRunner.commitTransaction();
        } catch (err) {
            // since we have errors lets rollback the changes we made
            await queryRunner.rollbackTransaction();
        } finally {
            // you need to release a queryRunner which was manually instantiated
            await queryRunner.release();
        }
    }
}