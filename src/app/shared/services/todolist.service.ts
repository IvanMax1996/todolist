import { Injectable } from '@angular/core';
import { Status, TodoItem } from '../types/todolist.type';
import { BehaviorSubject, count, every, filter, Observable, tap } from 'rxjs';

@Injectable()
export class TodolistService {
  status: Status = Status.All;
  toggleBtnVisible: boolean = true;
  countId: number = 0;
  todos$: BehaviorSubject<TodoItem[]> = new BehaviorSubject<TodoItem[]>([])

  get isCompleted(): Observable<boolean> {
    return this.todos$.pipe(
      every((item, i) => item[i].completed === true)
    )
  }

  get completedTodos() {
    return this.getItems(Status.Completed)
  }

  get activeTodos() {
    return this.getItems(Status.Active)
  }

  addItem(title: string): void {
    const todoItem: TodoItem = {
      id: this.countId,
      title,
      completed: false,
    };

    this.todos$.next(this.todos$.value.concat([todoItem]))

    this.countId++;
  }

  getItems(status: Status): Observable<TodoItem[]> {
    switch (status) {
      case 'active':
        return this.todos$.pipe(
          filter((item, i) => {
            return !item[i].completed;
          })
        );
      case 'completed':
        return this.todos$.pipe(
          filter((item, i) => {
            return item[i].completed;
          })
        );
    }

    return this.todos$;
  }

  removeItem(todo: TodoItem): void {
    const indexItem = this.todos$.value.indexOf(todo)

    this.todos$.next((this.todos$.value as any).toSpliced(indexItem, 1))
  }

  // toggleCheckedItem(todo: TodoItem): void {
  //   this.todos$ = this.todos$.pipe(
  //     map(item => {
  //       if(item.id === todo.id) return {...item, completed: !item.completed}
      
  //       return item
  //     })
  //   )
  // }

  // toggleAll(status: Status, isCompleted: boolean): void {
  //   if ((status === 'all' && !isCompleted) || status === 'active') {
  //     this.todos$ = this.todos$.pipe(
  //       map(item => {
  //         if (item.completed === false) return {...item, completed: true}
          
  //         return item
  //       })
  //     )
  //   } else if (isCompleted) {
  //     this.todos$ = this.todos$.pipe(
  //       map(item => {
  //        return {...item, completed: false}
  //       })
  //     )
  //   } else {
  //     this.todos$ = this.todos$.pipe(
  //       map(item => {
  //        return {...item, completed: false}
  //       })
  //     )
  //   }
  // }

  // clearCompleted(): void {
  //   this.todos$ = this.todos$.pipe(
  //     filter(item => {
  //       return !item.completed
  //     })
  //   )
  // }

  toggleButtonVisible(activeTodosLength: number, completedTodosLength: number): void {
    if (this.status !== 'all') {
      if (activeTodosLength === 0 || completedTodosLength === 0) {
        this.toggleBtnVisible = false;
      } else this.toggleBtnVisible = true;
    }
  }
}
