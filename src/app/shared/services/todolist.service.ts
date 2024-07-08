import { Injectable } from '@angular/core';
import { Status, Todolist } from '../types/todolist.type';
import { count, every, filter, map, merge, Observable, of } from 'rxjs';

@Injectable()
export class TodolistService {
  status: Status = Status.All;
  toggleBtnVisible: boolean = true;
  countId: number = 0;
  todos$: Observable<Todolist> = of()

  get countTodo() {
    let countObservable: number = 0
    this.todos$.pipe(count()).subscribe(item => {
      countObservable = item
    })

    return countObservable
  }

  get completedTodos(): Todolist[] {
    const completedArray: Todolist[] = []

    this.getItems(Status.Completed).subscribe(item => {
      completedArray.push(item)
    });

    return completedArray
  }

  get activeTodos(): Todolist[] {
    const activeArray: Todolist[] = []

    this.getItems(Status.Active).subscribe(item => {
      activeArray.push(item)
    })

    return activeArray
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
        if(item.id === todo.id) {
          return {...item, completed: !item.completed}
        } 
        else return item
      })
    )
  }

  toggleAll(status: Status): void {
    let isCompletedResult
    const isCompleted: Observable<boolean> = this.todos$.pipe(
      every(item => item.completed === true)
    )

    isCompleted.subscribe(item => {
      isCompletedResult = item
    })

    if ((status === 'all' && !isCompletedResult) || status === 'active') {
      this.todos$ = this.todos$.pipe(
        map(item => {
          if (item.completed === false) {
            return {...item, completed: true}
          } else return item
        })
      )
    } else if (isCompletedResult) {
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

  toggleButtonVisible(): void {
    if (this.status !== 'all') {
      if (this.activeTodos.length === 0 || this.completedTodos.length === 0) {
        this.toggleBtnVisible = false;
      } else this.toggleBtnVisible = true;
    }
  }
}
