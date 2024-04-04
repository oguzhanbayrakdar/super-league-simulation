import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PointTableComponent } from './point-table/point-table.component';
import { ChampionshipPredictionTableComponent } from './championship-prediction-table/championship-prediction-table.component';
import { ScoresTableComponent } from './scores-table/scores-table.component';
import { LeagueService } from '../../services/league.service';
import { LeagueComponent } from './league.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from '../../shared/shared.module';
import { AllMatchesScoresComponent } from './all-matches-scores/all-matches-scores.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditScoreModalComponent } from './all-matches-scores/edit-score-modal/edit-score-modal.component';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
		ScoresTableComponent,
		PointTableComponent,
		ChampionshipPredictionTableComponent,
		AllMatchesScoresComponent,
		LeagueComponent,
		EditScoreModalComponent
	],
  imports: [
    CommonModule,
		TableModule,
		ButtonModule,
		SharedModule,
		ToastModule,
		DynamicDialogModule,
		ReactiveFormsModule,
		FormsModule,
		InputTextModule
  ],
	providers: [ LeagueService, MessageService, DialogService ]
})
export class LeagueModule { }
