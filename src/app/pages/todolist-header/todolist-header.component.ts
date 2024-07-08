import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodolistService } from '../../shared/services/todolist.service';
import { Status, Todolist } from '../../shared/types/todolist.type';

@Component({
  standalone: true,
  selector: 'tdl-header',
  imports: [FormsModule],
  templateUrl: './todolist-header.component.html',
  styleUrl: './todolist-header.component.scss',
})
export class TodolistHeaderComponent {
  title: string = '';

  constructor(private todolistService: TodolistService) {}

  get todoList() {
    return this.todolistService.todos;
  }

  get completedTodos(): Todolist[] {
    return this.todolistService.getItems(Status.Completed);
  }

  get activeTodos(): Todolist[] {
    return this.todolistService.getItems(Status.Active);
  }

  get toggleBtnVisible() {
    return this.todolistService.toggleBtnVisible;
  }

  addTodo(): void {
    if (this.title) {
      this.todolistService.addItem(this.title);

      this.title = '';
    }

    if (this.todoList.length === 0) {
      this.todolistService.toggleBtnVisible = false;
    } else this.todolistService.toggleBtnVisible = true;
  }

  toggleAll(): void {
    const status = this.todolistService.status;

    this.todolistService.toggleAll(status);

    this.todolistService.toggleButtonVisible();
  }
}
