import { Component, ElementRef, ViewChild } from '@angular/core';
import { Todolist } from '../../shared/types/todolist.interface';
import { TodolistService } from '../../shared/services/todolist.service';

@Component({
  selector: 'tdl-footer',
  standalone: true,
  imports: [],
  templateUrl: './todolist-footer.component.html',
  styleUrl: './todolist-footer.component.scss',
})
export class TodolistFooterComponent {
  @ViewChild('footerBtnRef') btnRef?: ElementRef;

  constructor(private todolistService: TodolistService) {}

  get status() {
    return this.todolistService.status;
  }

  get todos(): Todolist[] {
    return this.todolistService.getItems(this.status);
  }

  get activeTodos(): Todolist[] {
    return this.todolistService.getItems('active');
  }

  get completedTodos(): Todolist[] {
    return this.todolistService.getItems('completed');
  }

  visibilityToggleButton(filteredTodo: Todolist[]): void {
    if (filteredTodo.length === 0) {
      this.todolistService.toggleBtnVisible = false;
    } else this.todolistService.toggleBtnVisible = true;
  }

  removeActiveClass(event: Event) {
    const allBtnFooter = document.querySelectorAll(
      '.todolist__footer-btn-wrap button'
    );

    allBtnFooter.forEach((btn) => {
      btn.classList.remove('active');
    });

    const btn = <HTMLElement>event.target;

    btn.classList.add('active');
  }

  getActive(event: Event) {
    this.todolistService.status = 'active';

    this.visibilityToggleButton(this.activeTodos)

    this.removeActiveClass(event);
  }

  getCompleted(event: Event): void {
    this.todolistService.status = 'completed';

    this.visibilityToggleButton(this.completedTodos)

    this.removeActiveClass(event);
  }

  getAll(event: Event) {
    this.todolistService.status = 'all';
    this.todolistService.toggleBtnVisible = true;

    this.removeActiveClass(event);
  }

  clearCompleted() {
    this.todolistService.clearCompleted();

    if (this.activeTodos.length === 0) {
      this.todolistService.status = 'all'
    }
    
  }
}
