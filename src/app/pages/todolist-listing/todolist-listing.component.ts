import { Component} from '@angular/core';
import { Status, TodoItem } from '../../shared/types/todolist.type';
import { TodolistService } from '../../shared/services/todolist.service';
import { TodolistItemComponent } from '../todolist-item/todolist-item.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'tdl-listing',
  standalone: true,
  imports: [TodolistItemComponent, AsyncPipe],
  templateUrl: './todolist-listing.component.html',
  styleUrl: './todolist-listing.component.scss',
})
export class TodolistListingComponent {
  constructor(private todolistService: TodolistService) {}

  get status(): Status {
    return this.todolistService.status;
  }

  get countTodo(): number {
    let count: number = 0

    this.todolistService.todos$.subscribe(item => {
      count = item.length
    })

    return count
  }

  get todoList() {
    return this.todolistService.getItems(this.status)
  }

  get activeTodos(): TodoItem[] {
    let activeArray: TodoItem[] = []

    this.todolistService.activeTodos.subscribe(item => {
      activeArray = item
    })

    return activeArray
  }

  get completedTodos(): TodoItem[] {
    let completedArray: TodoItem[] = []

    this.todolistService.completedTodos.subscribe(item => {
      completedArray = item
    })

    return completedArray
  }

  removeTodo(todo: TodoItem): void {
    this.todolistService.removeItem(todo.id);

    if ((this.status === Status.Active && this.activeTodos.length === 0)
      || (this.status === Status.Completed && this.completedTodos.length === 0)
    ) {
      this.todolistService.toggleBtnVisible = false
    }

    if (this.completedTodos.length === 0 && this.activeTodos.length === 0) {
      this.todolistService.status = Status.All;
    }
  }
}
