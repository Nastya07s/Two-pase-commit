import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Item, ItemDocument} from "./item.schema";
import {Model} from "mongoose";

@Injectable()
export class ItemRepository {
    constructor(
        @InjectModel(Item.name) private itemModel: Model<ItemDocument>
    ) {}

    public async findAll(): Promise<Item[]> {
        return this.itemModel.find();
    }
}