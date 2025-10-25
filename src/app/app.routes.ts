import { Routes } from '@angular/router';
import { MainComponent } from './layouts/main/main.component';
import { ProfilesComponent } from './layouts/profiles/profiles.component';
import { PostsComponent } from './layouts/posts/posts.component';
import { TodosComponent } from './layouts/todos/todos.component';
import { SharesComponent } from './layouts/shares/shares.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'profiles', component: ProfilesComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'posts/:userId', component: PostsComponent },
  { path: 'todos/:userId', component: TodosComponent },
  { path: 'shares', component: SharesComponent },
];
