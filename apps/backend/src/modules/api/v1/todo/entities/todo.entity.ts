// src/todo/todo.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';
import { UserDocument } from '../../user/entities/user.entity';

export type TodoDocument = HydratedDocument<Todo>;

@Schema()
export class Todo extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: false })
  completed: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }) // Reference to the User model
  user: UserDocument | string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
