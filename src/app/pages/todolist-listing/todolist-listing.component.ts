import { Component} from '@angular/core';
import { Status, Todolist } from '../../shared/types/todolist.type';
import { TodolistService } from '../../shared/services/todolist.service';
import { TodolistItemComponent } from '../todolist-item/todolist-item.component';
import { AsyncPipe } from '@angular/common';
import { Observable, toArray } from 'rxjs';

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
    return this.todolistService.countTodo
  }

  get todoList(): Observable<Todolist[]> {
    return this.todolistService.getItems(this.status).pipe(toArray())
  }

  removeTodo(todo: Todolist): void {
    this.todolistService.removeItem(todo);
  }
}
