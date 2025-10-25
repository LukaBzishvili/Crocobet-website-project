import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-navigation',
  imports: [],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit {
  constructor(private navService: NavigationService) {}

  isOpen: boolean = true;

  ngOnInit(): void {
    this.navService.navOpen$.subscribe((open) => {
      this.isOpen = open;
    });
  }

  public toggleNavigation() {
    this.isOpen = !this.isOpen;
  }
}
