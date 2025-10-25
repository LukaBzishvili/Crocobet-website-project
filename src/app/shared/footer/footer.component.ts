import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  openSection: string | null = null;

  toggleSection(section: string) {
    if (window.innerWidth <= 768) {
      this.openSection = this.openSection === section ? null : section;
    }
  }
}
