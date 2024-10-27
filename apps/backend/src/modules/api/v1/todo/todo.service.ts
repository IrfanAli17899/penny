// src/todo/todo.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from './entities/todo.entity';
import { User } from '../user/entities/user.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { ErrorMessage } from '../../../../constants/error-message.constant';
import { GetTodoListDto } from './dto/get-todo-list.dto';
import { removeUndefined } from '@penny/core';
import { paginate } from '../../../../utils/pagination-util';
import { PaginatedResponseDto } from '../../../../common/dto/filters.dto';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) { }

  async createTodo(obj: CreateTodoDto, user: User): Promise<Todo> {
    const newTodo = new this.todoModel({ ...obj, user: user._id });
    return newTodo.save();
  }

  async getTodosByUser(obj: GetTodoListDto, user: User): Promise<PaginatedResponseDto<Todo>> {
    return await paginate(this.todoModel, obj.pagination.page, obj.pagination.limit, {
      user: user._id,
      ...removeUndefined({
        completed: obj.filters.completed
      })
    })
  }

  async getTodoDetailById(_id: string, user: User): Promise<Todo> {
    const todo = await this.todoModel.findOne({ _id, user: user._id }).populate('user', { password: 0 });
    if (!todo) throw new NotFoundException(ErrorMessage.TODO_NOT_FOUND);
    return todo
  }

  async updateTodo(_id: string, updates: Partial<Todo>, user: User) {
    const todo = await this.getTodoDetailById(_id, user);
    await todo.updateOne(updates, { new: true });
    return { success: true }
  }

  async deleteTodo(_id: string, user: User) {
    const todo = await this.getTodoDetailById(_id, user);
    await todo.deleteOne();
    return { success: true }
  }
}
