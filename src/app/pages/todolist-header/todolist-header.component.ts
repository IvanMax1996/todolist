import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodolistService } from '../../shared/services/todolist.service';
import { AsyncPipe } from '@angular/common';
import { Status } from '../../shared/types/todolist.type';

@Component({
  standalone: true,
  selector: 'tdl-header',
  imports: [FormsModule, AsyncPipe],
  templateUrl: './todolist-header.component.html',
  styleUrl: './todolist-header.component.scss',
})
export class TodolistHeaderComponent {
  title: string = '';
 
  constructor(private todolistService: TodolistService) {}

  get status(): Status {
    return this.todolistService.status;
  }

  get countTodo(): number {
    return this.todolistService.countTodo
  }

  get toggleBtnVisible(): boolean {
    return this.todolistService.toggleBtnVisible;
  }

  addTodo(): void {
    if (this.title) {
      this.todolistService.addItem(this.title);

      this.title = '';
    }

    if (this.countTodo === 0) {
      this.todolistService.toggleBtnVisible = false;
    } else this.todolistService.toggleBtnVisible = true;
  }

  toggleAll(): void {
    this.todolistService.toggleAll(this.status);

    this.todolistService.toggleButtonVisible();
  }
}