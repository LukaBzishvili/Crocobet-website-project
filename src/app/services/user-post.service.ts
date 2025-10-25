import { Injectable } from '@angular/core';

// Users interfaces
export interface User {
  id: number;
  email: string;
  name: string;
  phone: string;
  userName: string;
  website: string;
  address: userAddress;
  company: userCompany;
}

export interface userAddress {
  city: string;
  street: string;
  suite: string;
  zipcode: string;
}

export interface userCompany {
  bs: string;
  catchPhrase: string;
  name: string;
}

// Post interfaces
export interface Post {
  body: String;
  id: number;
  title: string;
  userId: number;
}

export interface UserPostDetails {
  name: string;
  company: string;
}

// Todo interface

export interface UserTodoDetails {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserPostService {
  async getPosts(): Promise<Post[]> {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts: Post[] = await response.json();
    return posts;
  }

  async getSpecificPosts(userId: string): Promise<Post[]> {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    const posts: Post[] = await response.json();
    return posts;
  }

  async getUsers(): Promise<User[]> {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users: User[] = await response.json();
    return users;
  }

  async getSpecificUser(userId: string): Promise<User> {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    const user: User = await response.json();
    return user;
  }

  async getUserTodos(userId: string): Promise<UserTodoDetails[]> {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}/todos`
    );
    const todo: UserTodoDetails[] = await response.json();
    console.log(todo);
    return todo;
  }
}
