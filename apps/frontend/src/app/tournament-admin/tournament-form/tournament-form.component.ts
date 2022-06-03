import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TournamentData } from '../tournament-interface';
@Component({
  selector: 'st-tournament-form',
  templateUrl: './tournament-form.component.html',
  styleUrls: ['../tournament-admin-container/tournament-admin.component.scss']
})
export class TournamentFormComponent implements OnInit {
  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {}
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
        description: response.description.trim()
      };
      this.myForm.patchValue(this.tournament);
      console.log(this.tournament.description);
    });
  }
  onSubmit() {
    console.log('Submitted');
    // TODO: only emit save after successful saving to backend
    this.save.emit(this.myForm.value);
  }
}
