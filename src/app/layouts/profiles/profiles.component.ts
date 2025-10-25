import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { User, UserPostService } from '../../services/user-post.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { LoaderService } from '../../services/loader.service';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-profiles',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, LoaderComponent],
  templateUrl: './profiles.component.html',
  styleUrl: './profiles.component.scss',
})
export class ProfilesComponent implements OnInit {
  @ViewChild('searchInput') searchInputRef!: ElementRef;
  @ViewChild('searchResultsCont') searchResultsRef!: ElementRef;

  users: User[] = [];
  searchResults: User[] = [];
  isLoading: boolean = false;
  showResults: boolean = false;

  constructor(
    private userService: UserPostService,
    private loaderService: LoaderService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.loaderService.show();
    this.loaderService.loading$.subscribe((loading) => {
      this.isLoading = loading;
    });

    try {
      this.users = await this.userService.getUsers();
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setTimeout(() => {
        this.loaderService.hide();
      }, 500);
    }
  }

  searchForProfiles(inputValue: string) {
    const trimmedValue = inputValue.trim().toLowerCase();

    if (trimmedValue === '') {
      this.searchResults = [];
      this.showResults = false;
      return;
    }

    this.searchResults = this.users.filter((user) =>
      user.name.toLowerCase().includes(trimmedValue)
    );

    this.showResults = this.searchResults.length > 0;
  }

  SeeUserPosts(userId: number) {
    this.router.navigate(['/posts', userId]);
  }

  SeeUserTodos(userId: number) {
    this.router.navigate(['/todos', userId]);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const inputEl = this.searchInputRef?.nativeElement;
    const resultsEl = this.searchResultsRef?.nativeElement;

    if (
      inputEl &&
      resultsEl &&
      !inputEl.contains(event.target) &&
      !resultsEl.contains(event.target)
    ) {
      this.showResults = false;
    }
  }
}
