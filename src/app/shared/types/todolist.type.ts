export interface Todolist {
    title: string;
    completed: boolean;
}

export enum Status {
  All = 'all',
  Completed = 'completed',
  Active = 'active'
}