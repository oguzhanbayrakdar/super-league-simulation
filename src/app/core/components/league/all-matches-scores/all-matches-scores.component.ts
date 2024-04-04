import { Component, OnInit } from '@angular/core';
import { Fixture, LeagueService } from '../../../services/league.service';
import { Match } from '../../../models/match';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EditScoreModalComponent } from './edit-score-modal/edit-score-modal.component';

@Component({
  selector: 'app-all-matches-scores',
  templateUrl: './all-matches-scores.component.html',
  styleUrl: './all-matches-scores.component.scss'
})
export class AllMatchesScoresComponent implements OnInit {
	allScores: Fixture = [];
  ref: DynamicDialogRef | undefined;

	constructor(private leagueService: LeagueService, private dialogService: DialogService) { }
	
	ngOnInit(): void {
		this.allScores = this.leagueService.getFixture();
	}

	editScore(match: Match) {
		this.ref = this.dialogService.open(EditScoreModalComponent, {
			header: 'Skoru Değiştir',
			width: '30%',
			contentStyle: { 'max-height': '500px', 'overflow': 'auto' },
			baseZIndex: 10000,
			data: {
				match: match
			}
		})

		this.ref.onClose.subscribe((data) => {
			if(data){
				this.leagueService.editScore(match, data.homeScore, data.awayScore);
			}
		})
	}
}
