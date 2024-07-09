import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Todolist } from '../../shared/types/todolist.type';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { TodolistService } from '../../shared/services/todolist.service';
import { map } from 'rxjs';

@Component({
  selector: 'tdl-item',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './todolist-item.component.html',
  styleUrl: './todolist-item.component.scss',
})
export class TodolistItemComponent implements OnInit, AfterViewChecked {
  @Output() remove = new EventEmitter<Todolist>();
  @Input({ required: true }) todo!: Todolist;
  @ViewChild('todoInputRef') inputRef?: ElementRef;

  constructor(private todolistService: TodolistService) {}

  isEditing = false;
  randomLabel: string = '';
  title: string = '';

  removeTodo(): void {
    this.remove.emit(this.todo);
  }

  toggleTodo(): void {
    this.todolistService.toggleCheckedItem(this.todo);

    this.todolistService.toggleButtonVisible();
  }

  startEdit(): void {
    this.isEditing = true;
  }

  updateTodo(): void {
    if (!this.title) {
      this.remove.emit(this.todo);
    } else {
      this.todolistService.todos$.pipe(
        map(item => {
          if (item.id === this.todo.id) {
            return {...item, title: this.title}
          } 
          else return item
        })
      )
    }

    this.isEditing = false;
  }

  handleBlur(): void {
    this.isEditing = false;
  }

  handleFocus(): void {
    this.title = this.todo.title;
  }

  ngOnInit(): void {
    this.randomLabel =
      this.todo.title.replace(' ', '-').slice(0, 10) +
      '-' +
      Math.floor(Math.random() * 100);
  }

  ngAfterViewChecked(): void {
    if (this.isEditing) {
      this.inputRef?.nativeElement.focus();
    }
  }
}
