import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ type: mongoose.Schema.Types.ObjectId } )
    id: string;

    @Prop()
    first_name: number;

    @Prop()
    last_name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);