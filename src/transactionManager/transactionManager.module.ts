import {Item, ItemSchema} from "../items/item.schema";
import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "../user/user.schema";
import {TypeOrmModule} from "@nestjs/typeorm";
import AccountEntity from "../account/account.entity";
import {TransactionManagerService} from "./transactionManager.service";
import {TransactionManagerRepository} from "./transactionManager.repository";
import {TransactionManagerController} from "./transactionManager.controller";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Item.name, schema: ItemSchema }
        ], 'store'),
        TypeOrmModule.forFeature([AccountEntity])
    ],
    providers: [TransactionManagerService, TransactionManagerRepository],
    controllers: [TransactionManagerController],
    exports: [TransactionManagerService]
})
export class TransactionManagerModule {}