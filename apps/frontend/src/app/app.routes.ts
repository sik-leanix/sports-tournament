import { Routes } from '@angular/router'; // CLI imports router
import { NotFoundComponent } from './not-found/not-found.component';
import { TournamentAdminComponent } from './tournament-admin/tournament-admin-container/tournament-admin.component';

export const routes: Routes = [
  {
    path: ':tournament_url_slug/admin',
    component: TournamentAdminComponent
  },
  {
    path: '404',
    component: NotFoundComponent
  }
];
