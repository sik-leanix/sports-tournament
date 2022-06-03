import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TournamentData } from '../tournament-interface';
@Component({
  selector: 'st-tournament-form',
  templateUrl: './tournament-form.component.html',
  styleUrls: ['../tournament-admin-container/tournament-admin.component.scss']
})
export class TournamentFormComponent implements OnInit {
  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private router: Router) {}
  tournament!: TournamentData;
  tournamentUrlSlug$!: Observable<string>;
  urlSlug?: string;
  editingIsEnabled = true;
  myForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]),
    description: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(500)]),
    url_slug: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(40)])
  });

  @Output() save = new EventEmitter<TournamentData>();

  ngOnInit() {
    this.tournamentUrlSlug$ = this.route.paramMap.pipe(map((params) => params.get('tournament_url_slug')!));
    this.tournamentUrlSlug$.subscribe((slug) => (this.urlSlug = slug));
    this.httpClient.get<TournamentData>(`http://localhost:8000/tournaments/` + this.urlSlug).subscribe((response) => {
      this.tournament = {
        ...response,
        description: response.description //TODO: Adjust the text in a other way
          .replace(/(\r\n|\n|\r)/gm, '')
          .replace(/\s{2,}/g, ' ')
          .trim()
      };
      this.myForm.patchValue(this.tournament);
    });
  }
  updateTournamentData() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.httpClient
      .put<TournamentData>(
        'http://localhost:8000/tournaments/' + this.urlSlug,
        {
          name: this.myForm.value.name,
          description: this.myForm.value.description,
          url_slug: this.myForm.value.url_slug
        },
        { headers }
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
  navigate() {
    this.router.navigate(['/' + this.myForm.value.url_slug + '/admin']);
  }
  onSubmit() {
    try {
      this.updateTournamentData();
      this.save.emit(this.myForm.value);
    } catch (error) {
      console.error(error);
    }
    if (this.urlSlug != this.myForm.value.url_slug) {
      this.navigate();
    }
  }
}
