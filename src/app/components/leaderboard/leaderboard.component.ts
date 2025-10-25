import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

type WeekType = 'I' | 'II' | 'III' | 'IV';

interface LeaderboardEntry {
  customerId: number;
  loginName: string;
  place: number;
  week: WeekType;
}

@Component({
  selector: 'app-leaderboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
  weeks: (WeekType | 'ALL')[] = ['I', 'II', 'III', 'IV', 'ALL'];
  activeWeek: WeekType | 'ALL' = 'ALL';
  leaderboard: LeaderboardEntry[] = [];
  filteredLeaderboard: LeaderboardEntry[] = [];

  ngOnInit() {
    this.generateLeaderboardData();
    this.filterLeaderboard('ALL');
  }

  generateLeaderboardData() {
    const weeks: WeekType[] = ['I', 'II', 'III', 'IV'];

    for (let i = 1; i <= 50; i++) {
      const randomWeek = weeks[Math.floor(Math.random() * weeks.length)];
      this.leaderboard.push({
        customerId: Math.floor(Math.random() * 10000),
        loginName: 'User_' + Math.random().toString(36).substring(2, 7),
        place: i,
        week: randomWeek,
      });
    }
  }

  filterLeaderboard(week: WeekType | 'ALL') {
    this.activeWeek = week;
    this.filteredLeaderboard =
      week === 'ALL'
        ? this.leaderboard
        : this.leaderboard.filter((entry) => entry.week === week);
  }
}
