import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodolistHeaderComponent } from './pages/todolist-header/todolist-header.component';
import { TodolistListingComponent } from './pages/todolist-listing/todolist-listing.component';
import { TodolistFooterComponent } from './pages/todolist-footer/todolist-footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodolistHeaderComponent, TodolistListingComponent, TodolistFooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Todos';
}
