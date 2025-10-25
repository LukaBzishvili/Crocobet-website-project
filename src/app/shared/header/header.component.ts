import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  constructor(private navigationService: NavigationService) {}

  date: string = ' ';
  time: string = ' ';

  toggleNavFromHeader() {
    this.navigationService.openNav();
  }

  ngOnInit(): void {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
  }

  updateTime() {
    const now = new Date();
    this.date = now.toLocaleDateString('en-GB', { timeZone: 'Asia/Tbilisi' });
    this.time = now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Tbilisi' });
  }
}
