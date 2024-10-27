import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Document } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
@Schema()
export class User  extends Document {
    _id: Types.ObjectId

    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string; // This will be hashed

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Todo' }] })
    todos?: Types.Array<Types.ObjectId>;
}

export const UserSchema = SchemaFactory.createForClass(User);