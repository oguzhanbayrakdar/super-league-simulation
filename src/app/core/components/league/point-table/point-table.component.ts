import { Component } from '@angular/core';
import { Team } from '../../../models/team';
import { LeagueService } from '../../../services/league.service';

@Component({
  selector: 'app-point-table',
  templateUrl: './point-table.component.html',
  styleUrl: './point-table.component.scss'
})
export class PointTableComponent {
	pointsTable: Team[] = [];
	constructor(private leagueService: LeagueService) {
		this.leagueService.pointTable$.subscribe(teams => {
			this.pointsTable = teams
		})
	}

}
