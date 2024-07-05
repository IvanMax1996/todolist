import { Injectable } from '@angular/core';
import { Todolist } from '../types/todolist.interface';

@Injectable()
export class TodolistService {
  todos: Todolist[] = [];
  status: string = 'all';
  toggleBtnVisible: boolean = true;

  get completedTodos(): Todolist[] {
    return this.getItems('completed');
  }

  get activeTodos(): Todolist[] {
    return this.getItems('active');
  }

  addItem(title: string): void {
    const todo: Todolist = {
      title,
      completed: false,
    };

    this.todos.push(todo);
  }

  getItems(status: string): Todolist[] {
    switch (status) {
      case 'active':
        const finalActiveArray = this.todos.filter((todo) => !todo.completed)
        return finalActiveArray;
      case 'completed':
        return this.todos.filter((todo) => todo.completed);
    }

    return this.todos;
  }

  removeItem(todo: Todolist): void {
    const index = this.todos.indexOf(todo);
    this.todos.splice(index, 1);
  }

  toggleAll(status: string): void {
    const isCompleted = this.todos.every((item) => item.completed === true);

    if ((status === 'all' && !isCompleted) || status === 'active') {
      this.todos = this.todos.map((todo) => {
        if (todo.completed === false) {
          return { ...todo, completed: true };
        } else return todo;
      });
    } else if (isCompleted) {
      this.todos = this.todos.map((todo) => {
        return { ...todo, completed: false };
      });
    } else
      this.todos = this.todos.map((todo) => {
        return { ...todo, completed: false };
      });
  }

  clearCompleted(): void {
    this.todos = this.todos.filter((todo) => !todo.completed);
  }

  toggleButtonVisible() {
    if (this.status !== 'all') {
      if (this.activeTodos.length === 0 || this.completedTodos.length === 0) {
        this.toggleBtnVisible = false;
      } else this.toggleBtnVisible = true;
    }
  }
}
