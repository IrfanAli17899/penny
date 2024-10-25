// src/todo/todo.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { User } from '../../user/entities/user.entity';

export type TodoDocument = HydratedDocument<Todo>;

@Schema()
export class Todo extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: false })
  completed: boolean;

  @Prop({ type: User }) // Reference to the User model
  user: User;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
