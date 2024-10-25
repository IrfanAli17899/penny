import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TokenDocument = Token & Document;
@Schema()
export class Token {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, unique: true })
  refreshToken: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now, expires: '8h' }) // Optional: auto-delete after 8 hours
  expiresAt: Date;
}

export const TokenSchema = SchemaFactory.createForClass(Token);