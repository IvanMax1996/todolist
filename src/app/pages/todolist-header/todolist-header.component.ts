import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodolistService } from '../../shared/services/todolist.service';
import { AsyncPipe} from '@angular/common';
import { Status, Todolist } from '../../shared/types/todolist.type';
import { Observable, toArray } from 'rxjs';

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

  get todo(): Observable<Todolist[]> {
    return this.todolistService.todos$.pipe(toArray())
  }

  get countTodo(): number {
    return this.todolistService.countTodo
  }

  // get completedTodos() {
  //   return this.todolistService.getItems(Status.Completed);
  // }

  // get activeTodos() {
  //   return this.todolistService.getItems(Status.Active);
  // }

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
    const status = this.todolistService.status;

    this.todolistService.toggleAll(status);

    this.todolistService.toggleButtonVisible();
  }
}