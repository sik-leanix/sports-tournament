import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TournamentData } from '../tournament-interface';
@Component({
  selector: 'st-tournament-form',
  templateUrl: './tournament-overview.component.html',
  styleUrls: ['./tournament-overview.component.scss']
})
export class TournamentOverviewComponent implements OnInit {
  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {}
  tournament!: TournamentData;
  tournamentUrlSlug$!: Observable<string>;
  urlSlug: any;
  editingIsEnabled = true;
  myForm: FormGroup = new FormGroup({});

  ngOnInit() {
    this.tournamentUrlSlug$ = this.route.paramMap.pipe(map((params) => params.get('tournament_url_slug')!));
    this.tournamentUrlSlug$.subscribe((slug) => (this.urlSlug = slug));
    this.httpClient.get<TournamentData>(`http://localhost:8000/tournaments/` + this.urlSlug).subscribe((response) => {
      this.tournament = response;
      console.log('fetched tournament');
    });
    this.myForm = new FormGroup({
      name: new FormControl(this.tournament.name),
      description: new FormControl(this.tournament.description),
      url_slug: new FormControl(this.tournament.url_slug, Validators.required)
    });
    console.log('form updated!');
  }
  enableEditing() {
    this.editingIsEnabled = !this.editingIsEnabled;
  }
}
