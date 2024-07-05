import { AfterViewChecked, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { Todolist } from '../../shared/types/todolist.interface';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { TodolistService } from '../../shared/services/todolist.service';

@Component({
  selector: 'tdl-item',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './todolist-item.component.html',
  styleUrl: './todolist-item.component.scss'
})
export class TodolistItemComponent implements OnInit, AfterViewChecked {
  @Output() remove = new EventEmitter<Todolist>();
  @Input({required: true}) todo!: Todolist;
  @ViewChild('todoInputRef') inputRef?: ElementRef;

  private todolistService = inject(TodolistService)

  isEditing = false;
  randomLabel!: string
  title: string = ''

  get activeTodos(): Todolist[] {
    return this.todolistService.getItems('active');
  }

  get completedTodos(): Todolist[] {
    return this.todolistService.getItems('completed');
  }

  removeTodo(): void {
    this.remove.emit(this.todo);
  }

  toggleTodo(): void {
    this.todo.completed = !this.todo.completed;

    this.todolistService.toggleButtonVisible()
  }

  startEdit() {
    this.isEditing = true;
  }

  updateTodo() {
    if (!this.title) {
      this.remove.emit(this.todo);
    } else {
      this.todo.title = this.title;
    }

    this.isEditing = false;
  }

  handleBlur(e: Event) {
    this.isEditing = false;
  }

  handleFocus(e: Event) {
    this.title = this.todo.title;
  }

  ngOnInit(): void {
    this.randomLabel = this.todo.title.replace(' ', '-').slice(0, 10) + '-' + Math.floor(Math.random() * 10) 
  }

  ngAfterViewChecked(): void {
    if (this.isEditing) {
      this.inputRef?.nativeElement.focus();
    }
  }
}
