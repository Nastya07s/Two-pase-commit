import { Module } from '@nestjs/common';
import {ItemService} from "./item.service";
import {ItemRepository} from "./item.repository";
import {ItemController} from "./item.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {Item, ItemSchema} from "./item.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }], 'store'),],
    providers: [ItemService, ItemRepository],
    controllers: [ItemController],
    exports: [ItemService]
})
export class ItemModule {}