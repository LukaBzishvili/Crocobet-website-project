import { Component } from '@angular/core';
import { ProfilesComponent } from '../profiles/profiles.component';

@Component({
  selector: 'app-main',
  imports: [ProfilesComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {}
