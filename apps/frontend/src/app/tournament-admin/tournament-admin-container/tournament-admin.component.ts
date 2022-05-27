import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
@Component({
  selector: 'st-tournament-admin',
  templateUrl: './tournament-admin.component.html',
  styleUrls: ['./tournament-admin.component.scss']
})
export class TournamentAdminComponent implements OnInit {
  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {}
  tournament: any;
  tournamentUrlSlug$!: Observable<string>;
  urlSlug: any;
  editingIsEnabled = false;

  ngOnInit() {
    this.tournamentUrlSlug$ = this.route.paramMap.pipe(map((params) => params.get('tournament_url_slug')!));
    this.tournamentUrlSlug$.subscribe((slug) => (this.urlSlug = slug));
    this.httpClient.get<any>(`http://localhost:8000/tournaments/` + this.urlSlug).subscribe((response) => {
      this.tournament = response;
    });
  }
  enableEditing() {
    this.editingIsEnabled = !this.editingIsEnabled;
  }
}
