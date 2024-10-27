import { Component } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { CreateTodoComponent } from './components/create-todo/create-todo.component';

interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

@Component({
  selector: 'app-todos-page',
  standalone: true,
  imports: [NzTableModule, NzSpaceModule, NzButtonModule, NzInputModule, NzSelectModule, NzTagModule, CreateTodoComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosPageComponent {

  listOfData: Todo[] = [
    {
      id: '1',
      title: 'John Brown',
      completed: true,
      description: 'New York No. 1 Lake Park'
    },
    {
      id: '2',
      title: 'John Brown',
      completed: true,
      description: 'New York No. 1 Lake Park'
    },
    {
      id: '3',
      title: 'John Brown',
      completed: false,
      description: 'New York No. 1 Lake Park'
    },
    {
      id: '4',
      title: 'John Brown',
      completed: true,
      description: 'New York No. 1 Lake Park'
    },
    {
      id: '5',
      title: 'John Brown',
      completed: false,
      description: 'New York No. 1 Lake Park'
    },
  ];

}
