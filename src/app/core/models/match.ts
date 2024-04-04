import { Team } from "./team";

export class Match{
	home: Team;
	away: Team;
	homeGoals?: number;
	awayGoals?: number;
	played?: boolean;
	week: number;
	status?: 'homeWin' | 'awayWin' | 'draw' | 'not-played';

	constructor(details: Match) {
		this.home = details.home;
		this.away = details.away;
		this.homeGoals = details.homeGoals || 0;
		this.awayGoals = details.awayGoals || 0;
		this.played = details.played || false;
		this.week = details.week || 0;
		this.status = details.status || 'not-played';
	}
}