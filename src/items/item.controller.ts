import {Controller, Get} from "@nestjs/common";
import {ItemService} from "./item.service";
import {Item} from "./item.schema";

@Controller('/item')
export class ItemController {
    constructor(private readonly accountService: ItemService) {}

    @Get()
    public async findAll(): Promise<Item[]> {
        return this.accountService.findAll();
    }
}