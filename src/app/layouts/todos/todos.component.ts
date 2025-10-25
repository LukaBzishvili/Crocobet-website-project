import { Component, OnInit } from '@angular/core';
import {
  UserPostService,
  UserTodoDetails,
} from '../../services/user-post.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../services/loader.service';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-todos',
  imports: [CommonModule, LoaderComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent implements OnInit {
  todos: UserTodoDetails[] = [];
  sortOption: 'completed-first' | 'incomplete-first' = 'completed-first';
  isLoading: boolean = false;

  constructor(
    private todoService: UserPostService,
    private route: ActivatedRoute,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.loaderService.loading$.subscribe((loading) => {
      this.isLoading = loading;
    });

    this.loadUserTodos();
  }

  async loadUserTodos(): Promise<void> {
    const userId = this.route.snapshot.paramMap.get('userId');
    this.loaderService.show();

    try {
      if (userId) {
        this.todos = await this.todoService.getUserTodos(userId);
        this.sortTodos();
      } else {
        console.error('User Id could not be found');
      }
    } catch (error) {
      console.error('Error loading todos:', error);
    } finally {
      setTimeout(() => this.loaderService.hide(), 500);
    }
  }

  onSortChange(event: any): void {
    this.sortOption = event.target.value;
    this.sortTodos();
  }

  sortTodos(): void {
    const direction = this.sortOption === 'completed-first' ? -1 : 1;
    this.todos.sort(
      (a, b) => direction * (Number(a.completed) - Number(b.completed))
    );
  }
}
