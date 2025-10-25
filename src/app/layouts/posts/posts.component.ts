import { Component, OnInit } from '@angular/core';
import { Post, User, UserPostService } from '../../services/user-post.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../services/loader.service';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-posts',
  imports: [CommonModule, LoaderComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {
  constructor(
    private postService: UserPostService,
    private route: ActivatedRoute,
    private loaderService: LoaderService
  ) {}

  posts: Post[] = [];
  user: User | undefined;
  users: User[] = [];
  isOneUser: boolean = false;
  isLoading: boolean = false;

  ngOnInit(): void {
    this.loaderService.loading$.subscribe((loading) => {
      this.isLoading = loading;
    });

    this.loadPosts();
  }

  async loadPosts(): Promise<void> {
    const userId = this.route.snapshot.paramMap.get('userId');
    this.loaderService.show();

    try {
      if (userId) {
        this.isOneUser = true;
        this.user = await this.postService.getSpecificUser(userId);
        this.posts = await this.postService.getSpecificPosts(userId);
      } else {
        this.isOneUser = false;
        this.posts = await this.postService.getPosts();
        this.users = await this.postService.getUsers();
      }
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setTimeout(() => this.loaderService.hide(), 500);
    }
  }

  getUserName(userId: number) {
    const user = this.users.find((u) => u.id === userId);
    return user ? user.name : this.user?.name ? this.user.name : 'Unknown User';
  }

  getUserCompany(userId: number) {
    const user = this.users.find((u) => u.id === userId);
    return user
      ? user.company.name
      : this.user?.company.name
      ? this.user.company.name
      : 'Company not found';
  }
}
