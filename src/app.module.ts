import {TypeOrmModule} from "@nestjs/typeorm";
import { MongooseModule } from '@nestjs/mongoose';
import {Module} from "@nestjs/common";
import {UserModule} from "./user/user.module";
import AccountEntity from "./account/account.entity";
import {AccountModule} from "./account/account.module";
import {ItemModule} from "./items/item.module";
import {TransactionManagerModule} from "./transactionManager/transactionManager.module";

@Module({
    imports: [
        UserModule,
        AccountModule,
        ItemModule,
        TransactionManagerModule,
        MongooseModule.forRoot(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.h3ghf.mongodb.net/store?retryWrites=true&w=majority`, {
            connectionName: 'store'
        }),
        TypeOrmModule.forRoot({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: 'bank',
            entities: [AccountEntity],
        }),
    ],
})
export class AppModule {
}
