import { Injectable, inject } from '@angular/core';
import { ApiService } from '../api/api.service';
import { CreateTodoInput, DeleteTodoInput, Todo, UpdateTodoInput } from '../../store/todos/todos.models';
import { AxiosResponse } from 'axios';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private apiService = inject(ApiService);

  async fetchTodos() {
    const todos = (await this.apiService.api.get<{ data: Todo[] }>('/todo')).data;
    return todos;
  }

  async createTodo(todo: CreateTodoInput) {
    const todos = (await this.apiService.api.post<CreateTodoInput, AxiosResponse<Todo>>('/todo', { ...todo, completed: false })).data;
    return todos;
  }

  async updateTodo({ _id, ...todo }: UpdateTodoInput) {
    await this.apiService.api.patch<UpdateTodoInput>(`/todo/${_id}`, todo);
    return { _id, ...todo };
  }

  async deleteTodo({ _id }: DeleteTodoInput) {
    await this.apiService.api.delete<DeleteTodoInput>(`/todo/${_id}`);
    return { _id };
  }
}
