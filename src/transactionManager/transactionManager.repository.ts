import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Item, ItemDocument} from "../items/item.schema";
import {User, UserDocument} from "../user/user.schema";
import {InjectRepository} from "@nestjs/typeorm";
import AccountEntity from "../account/account.entity";
import {Connection, Repository} from "typeorm";

@Injectable()
export class TransactionManagerRepository {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Item.name) private itemModel: Model<ItemDocument>,
        @InjectRepository(AccountEntity)
        private readonly accountRepository: Repository<AccountEntity>,
        private accountConnection: Connection
    ) {}

    public async buy(itemId: string, userId: string): Promise<void> {
        const item = await this.itemModel.findById(itemId);
        if (!item) {
            throw new Error("Item doesn't exist")
        }

        await this.accountRepository.createQueryBuilder("account")
            .where("user_id = :user_id", { user_id: userId })
            .getOneOrFail();

        console.log("start: ..........");
        const itemSession = await this.itemModel.startSession();
        itemSession.startTransaction();

        const queryRunner = this.accountConnection.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            console.log("process: ..........");
            await this.accountConnection.createQueryBuilder(queryRunner)
                .update(AccountEntity)
                .set({ amount: () => `amount - ${item.price}` })
                .where("user_id = :user_id", { user_id: userId })
                .execute();

            await this.itemModel.updateOne({ _id: itemId }, { $inc: { count: -1 } }).session(itemSession)

            await queryRunner.commitTransaction();
            await itemSession.commitTransaction()
        } catch (err) {
            console.log("error: ..........", err);
            await queryRunner.rollbackTransaction();
            await itemSession.abortTransaction()
        } finally {
            console.log("final: ..........");
            await queryRunner.release();
            await itemSession.endSession();
        }
    }
}