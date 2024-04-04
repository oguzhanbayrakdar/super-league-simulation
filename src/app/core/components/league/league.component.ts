import { Component, OnInit } from '@angular/core';

import { LeagueService } from '../../services/league.service';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrl: './league.component.scss'
})
export class LeagueComponent implements OnInit {
	week = 1;
	
	constructor(private leagueService: LeagueService) {}

	ngOnInit(): void {
		this.leagueService.startLeague();
	}
	
	nextWeek(): void {
		this.leagueService.playWeek(this.week);
		this.week++;
	}

	endLeague(): void {
		this.leagueService.endLeague();
	}
}
