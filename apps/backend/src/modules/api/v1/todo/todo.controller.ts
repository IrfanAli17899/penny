import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { RequestUser, ReqUser } from '../../../../decorators/req-user.decorator';
import { AuthedOnly } from '../../../../guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { GetTodoListDto } from './dto/get-todo-list.dto'

@ApiTags('Todo')
@Controller()
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  @Post()
  @AuthedOnly()
  createTodo(@Body() createTodoDto: CreateTodoDto, @ReqUser() user: RequestUser) {
    return this.todoService.createTodo(createTodoDto, user);
  }

  @Get()
  @AuthedOnly()
  getTodosByUser(@Query() query: GetTodoListDto, @ReqUser() user: RequestUser) {
    return this.todoService.getTodosByUser(query, user);
  }

  @Get(":id")
  @AuthedOnly()
  getTodoDetail(@Param("id") _id: string, @ReqUser() user: RequestUser) {
    return this.todoService.getTodoDetailById(_id, user);
  }

  @Patch(':id')
  @AuthedOnly()
  updateTodo(@Param('id') _id: string, @Body() updateTodoDto: UpdateTodoDto, @ReqUser() user: RequestUser) {
    return this.todoService.updateTodo(_id, updateTodoDto, user);
  }

  @Delete(':id')
  @AuthedOnly()
  deleteTodo(@Param('id') _id: string, @ReqUser() user: RequestUser) {
    return this.todoService.deleteTodo(_id, user);
  }
}
