import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodolistService } from '../../shared/services/todolist.service';
import { AsyncPipe } from '@angular/common';
import { Status } from '../../shared/types/todolist.type';
import { count } from 'rxjs';

@Component({
  standalone: true,
  selector: 'tdl-header',
  imports: [FormsModule, AsyncPipe],
  templateUrl: './todolist-header.component.html',
  styleUrl: './todolist-header.component.scss',
})
export class TodolistHeaderComponent {
  constructor(private todolistService: TodolistService) {}

  title: string = '';
 
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

  get completedTodosLength(): number {
    let completedLength: number = 0

    this.todolistService.completedTodos.subscribe(item => {
      completedLength = item.length
    })

    return completedLength
  }

  get activeTodosLength(): number {
    let activeLength: number = 0

    this.todolistService.activeTodos.subscribe(item => {
      activeLength = item.length
    })

    return activeLength
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
    let isCompletedResult: boolean = false

    this.todolistService.isCompleted.subscribe(item => {
      isCompletedResult = item
    })

    this.todolistService.toggleAll(this.status, isCompletedResult);

    this.todolistService.toggleButtonVisible(this.activeTodosLength, this.completedTodosLength);
  }
}