import { Routes } from '@angular/router'; // CLI imports router
import { TournamentAdminComponent } from './tournament-admin/tournament-admin-container/tournament-admin.component';

export const routes: Routes = [
  {
    path: ':tournament_url_slug/admin',
    component: TournamentAdminComponent
  }
];
