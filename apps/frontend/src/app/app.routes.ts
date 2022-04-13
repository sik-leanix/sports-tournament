import { Routes } from '@angular/router'; // CLI imports router
import { NotFoundComponent } from './not-found/not-found.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { TournamentAdminComponent } from './tournament-admin/tournament-admin.component';

export const routes: Routes = [
    { path: '', component: NxWelcomeComponent },
    {
        path: ':tournament_url_slug/admin',
        component: TournamentAdminComponent
    },
    { path: '**', component: NotFoundComponent }
]