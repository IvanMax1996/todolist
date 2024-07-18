import { Injectable } from '@angular/core';
import { Status, TodoItem } from '../types/todolist.type';
import { BehaviorSubject, every, filter, from, Observable, switchMap, toArray } from 'rxjs';

@Injectable()
export class TodolistService {
  status: Status = Status.All;
  toggleBtnVisible: boolean = true;
  countId: number = 0;
  todos$: BehaviorSubject<TodoItem[]> = new BehaviorSubject<TodoItem[]>([])

  get isCompleted(): Observable<boolean> {
    return this.todos$.pipe(
      switchMap(item => {
        return from(item).pipe(
          every((item) => item.completed)
        )
      })
    )
  }

  get completedTodos(): Observable<TodoItem[]> {
    return this.getItems(Status.Completed)
  }

  get activeTodos(): Observable<TodoItem[]> {
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
          switchMap(item => {
            return from(item).pipe(
              filter((item) => !item.completed),
              toArray()
            )
          })
        )
      case 'completed':
        return this.todos$.pipe(
          switchMap(item => {
            return from(item).pipe(
              filter((item) => item.completed),
              toArray()
            )
          })
        )
    }

    return this.todos$;
  }

  removeItem(todo: TodoItem): void {
    const indexItem = this.todos$.value.indexOf(todo)

    this.todos$.next((this.todos$.value as any).toSpliced(indexItem, 1))
  }

  toggleCheckedItem(todo: TodoItem): void {
    let arrayResult: TodoItem[]

    arrayResult = this.todos$.value.map(item => {
      if (item.id === todo.id) {
        return {...item, completed: !item.completed}
      } 

      return item
    })
  
    this.todos$.next(arrayResult)
  }

  toggleAll(status: Status, isCompleted: boolean): void {
    let arrayResult: TodoItem[] = []

    if ((status === 'all' && !isCompleted) || status === 'active') {
      arrayResult = this.todos$.value.map((item) => {
        if (item.completed === false) {
          return {...item, completed: true}
        } 
          
        return item
       })
      
       this.todos$.next(arrayResult)
    } else if (isCompleted) {
      arrayResult = this.todos$.value.map((item) => {
        return {...item, completed: false}
       })
      
       this.todos$.next(arrayResult)
    } else {
      arrayResult = this.todos$.value.map((item) => {
        return {...item, completed: false}
       })
      
       this.todos$.next(arrayResult)
    }
  }

  updateTodo(todo: TodoItem, title: string) {
    let arrayResult: TodoItem[]

    arrayResult = this.todos$.value.map(item => {
      if (item.id === todo.id) {
        return {...item, title}
      } 

      return item
    })
  
    this.todos$.next(arrayResult)
  }

  clearCompleted(): void {
    let arrayResult: TodoItem[] = []

    arrayResult = this.todos$.value.filter(item => {
      return !item.completed
    })
    
    this.todos$.next(arrayResult)
  }

  toggleButtonVisible(activeTodosLength: number, completedTodosLength: number): void {
    if (this.status !== 'all') {
      if (activeTodosLength === 0 || completedTodosLength === 0) {
        this.toggleBtnVisible = false;
      } else this.toggleBtnVisible = true;
    }
  }
}
