import { Routes } from '@angular/router'; // CLI imports router
import { NotFoundComponent } from './not-found/not-found.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { TournamentAdminComponent } from './tournament-admin/tournament-admin-container/tournament-admin.component';
import { TournamentOverviewComponent } from './tournament-admin/tournament-overview/tournament-overview.component';

export const routes: Routes = [
  {
    path: ':tournament_url_slug/admin',
    component: TournamentAdminComponent
  },
  {
    path: ':tournament_url_slug/overview',
    component: TournamentOverviewComponent
  }
];
