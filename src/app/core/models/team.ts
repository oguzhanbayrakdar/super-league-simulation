export class Team{
	name: string;
	points: number;
	wins: number;
	draws: number;
	losses: number;
	gamesPlayed: number;
	goals: number;
	goalsAgainst: number;
	goalDifference: number;
	canBeChampion: boolean;
	
	power: number;
	
	constructor(teamName: string, power: number = 50) {
		this.name = teamName;
		this.points = 0;
		this.wins = 0;
		this.draws = 0;
		this.losses = 0;
		this.gamesPlayed = 0;
		this.goals = 0;
		this.goalsAgainst = 0;
		this.goalDifference = 0;
		this.power = power;
		this.canBeChampion = true;
	}

}