import { Component, ElementRef, ViewChild } from '@angular/core';
import { Status, Todolist } from '../../shared/types/todolist.type';
import { TodolistService } from '../../shared/services/todolist.service';
import { Observable } from 'rxjs';

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

  get activeTodos(): Todolist[] {
    const activeArray: Todolist[] = []

    this.todolistService.activeTodos.subscribe(item => {
      activeArray.push(item)
    })

    return activeArray
  }

  get completedTodos(): Todolist[] {
    const completedArray: Todolist[] = []

    this.todolistService.completedTodos.subscribe(item => {
      completedArray.push(item)
    })

    return completedArray
  }

  visibilityToggleButton(filteredTodo: Todolist[]): void {
    if (filteredTodo.length === 0) {
      this.todolistService.toggleBtnVisible = false;
    } else this.todolistService.toggleBtnVisible = true;
  }

  removeActiveClass(event: Event): void {
    const allBtnFooter = document.querySelectorAll(
      '.todolist__footer-btn-wrap button'
    );

    allBtnFooter.forEach((btn) => {
      btn.classList.remove('active');
    });

    const btn = <HTMLElement>event.target;

    btn.classList.add('active');
  }

  getActive(event: Event): void {
    this.todolistService.status = Status.Active;

    this.visibilityToggleButton(this.activeTodos)

    this.removeActiveClass(event);
  }

  getCompleted(event: Event): void {
    this.todolistService.status = Status.Completed;

    this.visibilityToggleButton(this.completedTodos)

    this.removeActiveClass(event);
  }

  getAll(event: Event): void {
    this.todolistService.status = Status.All;
    this.todolistService.toggleBtnVisible = true;

    this.removeActiveClass(event);
  }

  clearCompleted(): void {
    this.todolistService.clearCompleted();

    if (this.activeTodos.length === 0) {
      this.todolistService.status = Status.All;
    }
  }
}
