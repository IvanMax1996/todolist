import { Component } from '@angular/core';
import { Todolist } from '../../shared/types/todolist.type';
import { TodolistService } from '../../shared/services/todolist.service';
import { TodolistItemComponent } from '../todolist-item/todolist-item.component';

@Component({
  selector: 'tdl-listing',
  standalone: true,
  imports: [TodolistItemComponent],
  templateUrl: './todolist-listing.component.html',
  styleUrl: './todolist-listing.component.scss',
})
export class TodolistListingComponent {
  constructor(private todolistService: TodolistService) {}

  get status() {
    return this.todolistService.status;
  }

  get todos(): Todolist[] {
    return this.todolistService.getItems(this.status);
  }

  removeTodo(todo: Todolist): void {
    this.todolistService.removeItem(todo);
  }
}
