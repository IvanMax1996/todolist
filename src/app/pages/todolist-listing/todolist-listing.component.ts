import { AfterViewChecked, Component, DoCheck, Input, OnInit } from '@angular/core';
import { Todolist } from '../../shared/types/todolist.type';
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
  todo$ = this.todolistService.todos$

  get status() {
    return this.todolistService.status;
  }

  

  get todoList() {
    const result: Todolist[] = []
    this.todolistService.todos$.subscribe(item => {
      result.push(item)
    });

    return result
  }

  removeTodo(todo: Todolist): void {
    this.todolistService.removeItem(todo);
  }
}
