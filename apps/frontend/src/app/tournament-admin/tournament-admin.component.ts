import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'st-tournament-admin',
  templateUrl: './tournament-admin.component.html',
  styleUrls: ['./tournament-admin.component.scss']
})
export class TournamentAdminComponent {
  constructor(private route: ActivatedRoute) {}

  tournamentUrlSlug$!: Observable<string>;

  ngOnInit() {
    this.tournamentUrlSlug$ = this.route.paramMap.pipe(map((params) => params.get('tournament_url_slug')!));
  }
}
