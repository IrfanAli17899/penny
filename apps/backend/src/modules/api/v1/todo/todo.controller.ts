import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { User } from '../../../../decorators/user.decorator';
import { UserDocument } from '../user/entities/user.entity';
import { AuthedOnly } from '../../../../guards/auth.guard';

@Controller()
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  @Post()
  @AuthedOnly()
  createTodo(@Body() createTodoDto: CreateTodoDto, @User() user: UserDocument) {
    return this.todoService.createTodo(createTodoDto, user);
  }

  @Get()
  @AuthedOnly()
  getTodosByUser() {
    return this.todoService.getTodosByUser(null);
  }

  @Patch(':id')
  @AuthedOnly()
  updateTodo(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto, @User() user: UserDocument) {
    return this.todoService.updateTodo(id, updateTodoDto, user);
  }

  @Delete(':id')
  @AuthedOnly()
  deleteTodo(@Param('id') id: string, @User() user: UserDocument) {
    return this.todoService.deleteTodo(id, user);
  }
}
