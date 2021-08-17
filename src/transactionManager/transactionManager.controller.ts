import {Body, Controller, Param, Put} from "@nestjs/common";
import {TransactionManagerService} from "./transactionManager.service";

@Controller('/store')
export class TransactionManagerController {
    constructor(private readonly transactionManagerService: TransactionManagerService) {}

    @Put('/:user_id/buy/:item_id')
    public async buy(
        @Param("item_id") itemId: string,
        @Param("user_id") userId: string,
    ): Promise<void> {
        return this.transactionManagerService.buy(itemId, userId);
    }
}