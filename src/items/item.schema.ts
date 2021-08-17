import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ItemDocument = Item & Document;

@Schema()
export class Item {
    @Prop({ type: mongoose.Schema.Types.ObjectId } )
    id: string;

    @Prop()
    name: string;

    @Prop()
    price: number;

    @Prop()
    count: number;
}

export const ItemSchema = SchemaFactory.createForClass(Item);