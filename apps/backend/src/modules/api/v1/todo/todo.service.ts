// src/todo/todo.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from './entities/todo.entity';
import { User } from '../user/entities/user.entity';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) { }

  async createTodo(obj: CreateTodoDto, user: User): Promise<Todo> {
    const newTodo = new this.todoModel({ ...obj, user });
    return newTodo.save();
  }

  async getTodosByUser(user: User): Promise<Todo[]> {
    return this.todoModel.find({ user }).exec();
  }

  async updateTodo(id: string, updates: Partial<Todo>, user: User): Promise<Todo> {
    return this.todoModel.findByIdAndUpdate(id, updates, { new: true }).exec();
  }

  async deleteTodo(id: string, user: User): Promise<Todo> {
    return this.todoModel.findByIdAndDelete(id).exec();
  }
}
