import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { Team } from '../models/team';
import { Match } from '../models/match';
import { MessageService } from 'primeng/api';

@Injectable({
	providedIn: 'root'
})
export class LeagueService {
	pointTable$ = new Subject<Team[]>();
	currentWeekMatchScores$ = new Subject<{ week: number, matches: Match[] }>();
	private currentWeek = 0;
	private teams: Team[] = [];
	private fixture: Fixture = [];

	constructor(private messageService: MessageService) { }

	startLeague() {
		// Create teams
		this.teams = [
			new Team('Galatasaray', 90),
			new Team('Fenerbahçe', 80),
			new Team('Beşiktaş', 70),
			new Team('Akçaabat Sebat Spor', 100),
		]

		// When the league starts, we reset the points table to alphabetical order
		this.teams = this.sortPointsTable();

		// Notify the points table component
		this.pointTable$.next(this.teams);

		// Generate league fixture 
		this.fixture = this.generateFixture(this.teams)
	}

	// Plays the remaining weeks
	endLeague() {
		if(this.fixture.length > this.currentWeek){
			for (let i = this.currentWeek + 1; i <= this.fixture.length; i++) {
				this.playWeek(i);
			}
		}else{
			const champion = this.sortPointsTable()[0];
			this.messageService.add({ key: 'champion-toast-key', severity: 'success', summary: 'LIG BITTI', detail: champion.name + ' şampiyon oldu!' });
		}
	}

	getFixture() {
		return this.fixture;
	}

	getCurrentWeek() {
		return this.currentWeek;
	}

	editScore(match: Match, homeScore: number, awayScore: number) {
		// When we edit score of a match, we need to update the points table and the match itself.
		const originalHomeGoals = match.homeGoals!
		const originalAwayGoals = match.awayGoals!
		// Update the match
		match.homeGoals = homeScore;
		match.awayGoals = awayScore;
		match.home.goals += homeScore - originalHomeGoals;
		match.away.goals += awayScore - originalAwayGoals;
		match.home.goalsAgainst += awayScore - originalAwayGoals;
		match.away.goalsAgainst += homeScore - originalHomeGoals;
		match.home.goalDifference = match.home.goals - match.home.goalsAgainst;
		match.away.goalDifference = match.away.goals - match.away.goalsAgainst;

		// For example: If the old match's status is homeWin, and the new score is not homeWin, we need to update the points table accordingly.
		if(match.status === 'homeWin'){
			// If draw
			if(homeScore === awayScore){
				match.home.wins--;
				match.home.points -= 2;
				match.home.draws++;

				match.away.losses--;
				match.away.points++;
				match.away.draws++;
				
			}else if(homeScore < awayScore){ // If away win
				match.home.wins--;
				match.home.points -= 3;
				match.home.losses++;

				match.away.losses--;
				match.away.points += 3;
				match.away.wins++;
			}
		}else if(match.status === 'awayWin'){
			// If draw
			if(homeScore === awayScore){
				match.away.wins--;
				match.away.points -= 2;
				match.away.draws++;

				match.home.losses--;
				match.home.points++;
				match.home.draws++;
				
			}else if(homeScore > awayScore){ // If home win
				match.away.wins--;
				match.away.points -= 3;
				match.away.losses++;

				match.home.losses--;
				match.home.points += 3;
				match.home.wins++;
			}
		}else{ // If match status is draw
			if(homeScore > awayScore){
				match.home.points += 2;
				match.away.points--;
				match.home.draws--;
				match.away.draws--;
			}else if(awayScore > homeScore){
				match.home.points--;
				match.away.points += 2;
				match.home.draws--;
				match.away.draws--;
			}
		}

		let homeTeamIndex = this.teams.findIndex(team => team.name === match.home.name)!;
		let awayTeamIndex = this.teams.findIndex(team => team.name === match.away.name)!;

		this.teams.splice(homeTeamIndex, 1, match.home);
		this.teams.splice(awayTeamIndex, 1, match.away);
		
		let sortedPointsTable = this.sortPointsTable();
		sortedPointsTable = this.calculateChampionshipPossibilities(sortedPointsTable);
		this.pointTable$.next(sortedPointsTable)
	}

	sortPointsTable() {
		return this.teams.sort((a, b) => {
			// Sort by points
			if (a.points > b.points) {
				return -1;
			} else if (a.points < b.points) {
				return 1;
			} else {
				// If the points are the same, sort by goal difference
				if (a.goalDifference > b.goalDifference) {
					return -1;
				} else if (a.goalDifference < b.goalDifference) {
					return 1;
				} else {
					// If the goal difference is also the same, sort by the team name
					if (a.name < b.name) {
						return -1;
					}
					return 1
				}
			}
		})
	}

	playWeek(week: number) {
		if (this.fixture.length === this.currentWeek)return;
	
		const matches = this.fixture[week - 1];

		matches.forEach(match => {
			const homeTeamPower = match.home.power;
			const awayTeamPower = match.away.power;

			// Limit the goals to 5
			const homeTeamGoals = Math.round(Math.random() * homeTeamPower / 20);
			const awayTeamGoals = Math.round(Math.random() * awayTeamPower / 20);

			match.homeGoals = homeTeamGoals;
			match.awayGoals = awayTeamGoals;
			match.played = true;

			if (homeTeamGoals > awayTeamGoals) {
				match.status = 'homeWin';
				match.home.wins++;
				match.away.losses++;
				match.home.points += 3;
			} else if (homeTeamGoals < awayTeamGoals) {
				match.status = 'awayWin';
				match.home.losses++;
				match.away.wins++;
				match.away.points += 3;
			} else {
				match.status = 'draw';
				match.home.draws++;
				match.away.draws++;
				match.home.points++;
				match.away.points++;
			}

			match.home.goals += homeTeamGoals;
			match.home.goalsAgainst += awayTeamGoals;
			match.home.goalDifference = match.home.goals - match.home.goalsAgainst;

			match.away.goals += awayTeamGoals;
			match.away.goalsAgainst += homeTeamGoals;
			match.away.goalDifference = match.away.goals - match.away.goalsAgainst;

			match.home.gamesPlayed++;
			match.away.gamesPlayed++;
		});

		this.fixture[week - 1] = matches;
		this.currentWeek = week;

		let newPointsTable = this.sortPointsTable();

		//calculate championship possibilities
		newPointsTable = this.calculateChampionshipPossibilities(newPointsTable);

		this.currentWeekMatchScores$.next({
			week,
			matches
		})

		this.pointTable$.next(newPointsTable);

		// If the current week is equal to the number of weeks, the league is over.
		if (this.currentWeek === this.fixture.length) this.endLeague();

		return matches;
	}

	private calculateChampionshipPossibilities(pointsTable: Team[]) {
		//If a team has more than [3 * remaining weeks] points behind the leader, it cannot be a champion.
		for (let i = 0; i < pointsTable.length; i++) {
			const leader = pointsTable[0];
			leader.canBeChampion = true;
			const remainingWeeks = this.fixture.length - this.currentWeek;
			const maxPossiblePoints = pointsTable[i].points + remainingWeeks * 3;
			if (maxPossiblePoints < leader.points) {
				pointsTable[i].canBeChampion = false;
			} else {
				pointsTable[i].canBeChampion = true;
			}

		}
		return pointsTable
	}

	// After generating the first half of the fixture, we reverse the away and home teams to generate the second half of the fixture.
	private generateFixture(teams: Team[]): Fixture {
		const matchesPerWeek = teams.length / 2;

		const fixture = [];
		//First half of the fixture
		for (let i = 0; i < teams.length - 1; i++) {
			const week = [];
			for (let j = 0; j < matchesPerWeek; j++) {
				const match = new Match({
					home: teams[j],
					away: teams[teams.length - 1 - j],
					week: i + 1
				})
				week.push(match)
			}
			fixture.push(week)
			teams.splice(1, 0, teams.pop() as Team);
		}

		// Second half of the fixture
		for (let i = 0; i < teams.length - 1; i++) {
			// Change the away team to home team. Home team to away team
			fixture[i + teams.length - 1] = fixture[i].map(match => {
				return new Match({ home: match.away, away: match.home, week: i + teams.length })
			})

		}

		return fixture;
	}
}
export type Fixture = Match[][];