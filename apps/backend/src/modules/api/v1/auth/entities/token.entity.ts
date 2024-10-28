import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type TokenDocument = HydratedDocument<Token>;
@Schema()
export class Token extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  token: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now, expires: '8h' }) // Optional: auto-delete after 8 hours
  expiresAt: Date;
}

export const TokenSchema = SchemaFactory.createForClass(Token);