import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, merge, Observable, Subject, switchMap } from 'rxjs';
import { TournamentData } from '../tournament-interface';
@Component({
  selector: 'st-tournament-admin',
  templateUrl: './tournament-admin.component.html',
  styleUrls: ['./tournament-admin.component.scss']
})
export class TournamentAdminComponent implements OnInit {
  editingIsEnabled = false;

  tournament$!: Observable<TournamentData>;

  private tournamentUrlSlug$!: Observable<string>;
  private tournamentDataUpdated$ = new Subject<TournamentData>();

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {}

  ngOnInit() {
    this.tournamentUrlSlug$ = this.route.paramMap.pipe(map((params) => params.get('tournament_url_slug')!));
    const initialTournamentData$ = this.tournamentUrlSlug$.pipe(
      switchMap((urlSlug) => this.httpClient.get<TournamentData>(`http://localhost:8000/tournaments/` + urlSlug))
    );
    this.tournament$ = merge(initialTournamentData$, this.tournamentDataUpdated$);
  }
  enableEditing() {
    this.editingIsEnabled = !this.editingIsEnabled;
  }

  onSaveTournamentForm(newData: TournamentData) {
    this.editingIsEnabled = false;
    this.tournamentDataUpdated$.next(newData);
  }
}
