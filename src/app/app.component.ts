import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LeagueModule } from './core/components/league/league.module';
import { SharedModule } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LeagueModule, SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'super-league-simulation';
}
