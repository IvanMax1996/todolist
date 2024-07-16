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
import { TodoItem } from '../../shared/types/todolist.type';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { TodolistService } from '../../shared/services/todolist.service';

@Component({
  selector: 'tdl-item',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './todolist-item.component.html',
  styleUrl: './todolist-item.component.scss',
})
export class TodolistItemComponent implements OnInit, AfterViewChecked {
  @Output() remove = new EventEmitter<TodoItem>();
  @Input({ required: true }) todo!: TodoItem;
  @ViewChild('todoInputRef') inputRef?: ElementRef;

  isEditing = false;
  randomLabel: string = '';
  title: string = '';

  constructor(private todolistService: TodolistService) {}

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

  removeTodo(): void {
    this.remove.emit(this.todo);
  }

  toggleTodo(): void {
    this.todolistService.toggleCheckedItem(this.todo);

    this.todolistService.toggleButtonVisible(this.activeTodosLength, this.completedTodosLength);
  }

  startEdit(): void {
    this.isEditing = true;
  }

  updateTodo(): void {
    if (!this.title) {
      this.remove.emit(this.todo);
    } else {
      this.todolistService.updateTodo(this.todo, this.title)
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
      Math.floor(Math.random() * 1000);
  }

  ngAfterViewChecked(): void {
    if (this.isEditing) {
      this.inputRef?.nativeElement.focus();
    }
  }
}
