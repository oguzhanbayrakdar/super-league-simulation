import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Match } from '../../../../models/match';

@Component({
  selector: 'app-edit-score-modal',
  templateUrl: './edit-score-modal.component.html',
  styleUrl: './edit-score-modal.component.scss'
})
export class EditScoreModalComponent implements OnInit{
	homeScore: number = 0;
	awayScore: number = 0;
	match!: Match;
	editScoreFormGroup = new FormGroup({
		homeScore: new FormControl(this.homeScore, [Validators.required, Validators.min(0)]),
		awayScore: new FormControl(this.awayScore, [Validators.required, Validators.min(0)])
	})

	constructor(private ref: DynamicDialogRef, private dialogService: DialogService) { }
	
	ngOnInit(): void {
		const instance = this.dialogService.getInstance(this.ref);
		this.match = instance.data.match;

		this.editScoreFormGroup.patchValue({
			homeScore: this.match.homeGoals,
			awayScore: this.match.awayGoals
		})
	}

	onSubmit(){
		this.ref.close({
			homeScore: this.editScoreFormGroup.value.homeScore,
			awayScore: this.editScoreFormGroup.value.awayScore
		})
	}

	close(){
		this.ref.close(null)
	}
}
