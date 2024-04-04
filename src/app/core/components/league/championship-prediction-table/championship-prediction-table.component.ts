import { Component } from '@angular/core';
import { LeagueService } from '../../../services/league.service';
import { Team } from '../../../models/team';

@Component({
	selector: 'app-championship-prediction-table',
	templateUrl: './championship-prediction-table.component.html',
	styleUrl: './championship-prediction-table.component.scss'
})
export class ChampionshipPredictionTableComponent {
	predictions: { name: string, percentage: number }[] = [];
	currentWeek: number = 0;
	constructor(private leagueService: LeagueService) {
		this.leagueService.pointTable$.subscribe(teams => {
			this.currentWeek = this.leagueService.getCurrentWeek();
			console.log('Current week:', this.currentWeek);
			this.predictions = this.calculateChampionshipPercentages(teams)
		});
	}

	// Calculate each teams championship percentage by comparing them in a 6 weeks league.
	private calculateChampionshipPercentages(teams: Team[]): any[] {
		if (this.currentWeek < 3) return [] // return empty array if the league is not half way through
		const leader = teams[0];
		const remainingWeeks = (teams.length - 1) * 2 - this.currentWeek;
		const maxPossiblePoints = leader.points + remainingWeeks * 3;
		const percentages = teams.map(team => {
			if (team === leader && remainingWeeks === 0) { // If the leader has the maximum possible points at the end of the league
				return {
					name: team.name,
					percentage: 100
				};
			} else if (remainingWeeks === 0) { // If remaining weeks are 0, the team can't be the champion (except for leader)
				return {
					name: team.name,
					percentage: 0
				};
			} else if (maxPossiblePoints < team.points) { // If the team's max possible points are less than the difference between the leader and the team
				return {
					name: team.name,
					percentage: 0
				};
			} else { // Calculate the percentage
				const percentage = Math.round((team.wins * 3 + team.draws) / (3 * 2 * (teams.length - 1)) * 100)
				return {
					name: team.name,
					percentage
				};
			}
		});
		return percentages;
	}

}
