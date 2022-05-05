import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'st-tournament-admin',
  templateUrl: './tournament-admin.component.html',
  styleUrls: ['./tournament-admin.component.scss']
})
export class TournamentAdminComponent {
  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {}
  tournament: any;
  tournamentUrlSlug$!: Observable<string>;

  ngOnInit() {
    this.tournamentUrlSlug$ = this.route.paramMap.pipe(map((params) => params.get('tournament_url_slug')!));
    this.httpClient.get<any>(`http://localhost:8000/tournaments/wimbledon2022`).subscribe((response) => {
      console.log(response);
      this.tournament = response;
    });
  }
  getTournaments() {
    this.httpClient.get<any>(`http://localhost:8000/tournaments/wimbledon2022`).subscribe((response) => {
      console.log(response);
      this.tournament = response;
    });
  }
}
