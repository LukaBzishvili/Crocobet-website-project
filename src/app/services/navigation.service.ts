import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private navOpen = new BehaviorSubject<boolean>(false);
  navOpen$ = this.navOpen.asObservable();

  constructor() {}

  toggleNav() {
    this.navOpen.next(!this.navOpen.value);
  }

  closeNav() {
    this.navOpen.next(false);
  }

  openNav() {
    this.navOpen.next(true);
  }
}
