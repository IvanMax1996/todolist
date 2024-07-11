import { Injectable } from '@angular/core';
import { Status, Todolist } from '../types/todolist.type';
import { count, every, filter, map, merge, Observable, of } from 'rxjs';

@Injectable()
export class TodolistService {
  status: Status = Status.All;
  toggleBtnVisible: boolean = true;
  countId: number = 0;
  todos$: Observable<Todolist> = of()

  get isCompleted(): Observable<boolean> {
    return this.todos$.pipe(
      every(item => item.completed === true)
    )
  }

  get countTodo(): Observable<number> {
    return this.todos$.pipe(count())
  }

  get completedTodos() {
    return this.getItems(Status.Completed)
  }

  get activeTodos() {
    return this.getItems(Status.Active)
  }

  addItem(title: string): void {
    const todoItem: Todolist = {
      id: this.countId,
      title,
      completed: false,
    };

    const todoItemObservable = of(todoItem)

    this.todos$ = merge(this.todos$, todoItemObservable)

    this.countId++;
  }

  getItems(status: Status): Observable<Todolist> {
    switch (status) {
      case 'active':
        return this.todos$.pipe(
          filter((item) => {
            return !item.completed;
          })
        );
      case 'completed':
        return this.todos$.pipe(
          filter((item) => {
            return item.completed;
          })
        );
    }

    return this.todos$;
  }

  removeItem(todo: Todolist): void {
    this.todos$ = this.todos$.pipe(
      filter(item => {
        return item.id !== todo.id
      })
    )
  }

  toggleCheckedItem(todo: Todolist): void {
    this.todos$ = this.todos$.pipe(
      map(item => {
        if(item.id === todo.id) return {...item, completed: !item.completed}
      
        return item
      })
    )
  }

  toggleAll(status: Status, isCompleted: boolean): void {
    if ((status === 'all' && !isCompleted) || status === 'active') {
      this.todos$ = this.todos$.pipe(
        map(item => {
          if (item.completed === false) return {...item, completed: true}
          
          return item
        })
      )
    } else if (isCompleted) {
      this.todos$ = this.todos$.pipe(
        map(item => {
         return {...item, completed: false}
        })
      )
    } else {
      this.todos$ = this.todos$.pipe(
        map(item => {
         return {...item, completed: false}
        })
      )
    }
  }

  clearCompleted(): void {
    this.todos$ = this.todos$.pipe(
      filter(item => {
        return !item.completed
      })
    )
  }

  toggleButtonVisible(activeTodosLength: number, completedTodosLength: number): void {
    if (this.status !== 'all') {
      if (activeTodosLength === 0 || completedTodosLength === 0) {
        this.toggleBtnVisible = false;
      } else this.toggleBtnVisible = true;
    }
  }
}
