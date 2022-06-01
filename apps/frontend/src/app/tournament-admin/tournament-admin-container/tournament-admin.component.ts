import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { TournamentData } from '../tournament-interface';
@Component({
  selector: 'st-tournament-admin',
  templateUrl: './tournament-admin.component.html',
  styleUrls: ['./tournament-admin.component.scss']
})
export class TournamentAdminComponent implements OnInit {
  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {}
  tournament$!: Observable<TournamentData>;
  editingIsEnabled = false;

  private tournamentUrlSlug$!: Observable<string>;

  ngOnInit() {
    this.tournamentUrlSlug$ = this.route.paramMap.pipe(map((params) => params.get('tournament_url_slug')!));
    this.tournament$ = this.tournamentUrlSlug$.pipe(
      switchMap((urlSlug) => this.httpClient.get<TournamentData>(`http://localhost:8000/tournaments/` + urlSlug))
    );
  }
  enableEditing() {
    this.editingIsEnabled = !this.editingIsEnabled;
  }
}
