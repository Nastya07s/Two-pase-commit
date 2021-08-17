import {Injectable} from "@nestjs/common";
import {ItemRepository} from "./item.repository";
import {Item} from "./item.schema";

@Injectable()
export class ItemService {
    constructor(
        private readonly itemRepository: ItemRepository,
    ) {}

    public async findAll(): Promise<Item[]> {
        return this.itemRepository.findAll();
    }
}