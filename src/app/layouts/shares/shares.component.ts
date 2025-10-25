import { Component } from '@angular/core';
import { WheelComponent } from '../../components/wheel/wheel.component';
import { LeaderboardComponent } from '../../components/leaderboard/leaderboard.component';

@Component({
  selector: 'app-shares',
  imports: [WheelComponent, LeaderboardComponent],
  templateUrl: './shares.component.html',
  styleUrl: './shares.component.scss',
})
export class SharesComponent {}
