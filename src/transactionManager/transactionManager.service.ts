import {Injectable, Scope} from '@nestjs/common';
import {TransactionManagerRepository} from "./transactionManager.repository";

@Injectable()
export class TransactionManagerService {
    constructor(
        private transactionManagerRepository: TransactionManagerRepository,
    ) {}

    public async buy(itemId, userId): Promise<void> {
        return this.transactionManagerRepository.buy(itemId, userId);
    }
}