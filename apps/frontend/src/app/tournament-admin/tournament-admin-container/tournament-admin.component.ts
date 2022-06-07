import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, merge, Observable, Subject, switchMap } from 'rxjs';
import { TournamentData } from '../tournament-interface';
import { response } from 'express';
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

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private router: Router) {}

  ngOnInit() {
    this.tournamentUrlSlug$ = this.route.paramMap.pipe(map((params) => params.get('tournament_url_slug')!));
    const initialTournamentData$ = this.tournamentUrlSlug$.pipe(
      switchMap((urlSlug) => this.httpClient.get<TournamentData>(`http://localhost:8000/tournaments/` + urlSlug))
    );
    initialTournamentData$.subscribe(
      (response) => {
        console.log('Fetched tournament');
      },
      (error) => {
        if (error.status === 404) {
          console.error('Tournament not found');
          this.navigate();
        }
      }
    );
    this.tournament$ = merge(initialTournamentData$, this.tournamentDataUpdated$);
  }
  navigate() {
    //TODO: Only navigate to 404 if tournament not found
    this.router.navigate(['/404']);
  }
  enableEditing() {
    this.editingIsEnabled = !this.editingIsEnabled;
  }

  onSaveTournamentForm(newData: TournamentData) {
    this.editingIsEnabled = false;
    this.tournamentDataUpdated$.next(newData);
  }
}
