import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Match } from '../../../models/match';
import { LeagueService } from '../../../services/league.service';

@Component({
  selector: 'app-scores-table',
  templateUrl: './scores-table.component.html',
  styleUrl: './scores-table.component.scss'
})
export class ScoresTableComponent {
	currentWeekScores: Match[] = [];
	week = 1;

	constructor(private leagueService: LeagueService) {
		this.leagueService.currentWeekMatchScores$.subscribe(data => {
			this.currentWeekScores = data.matches;
			this.week = data.week
		});	
	}
}
