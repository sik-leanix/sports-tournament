import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { NotFoundComponent } from './not-found/not-found.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { TournamentAdminComponent } from './tournament-admin/tournament-admin.component';


@NgModule({
  declarations: [AppComponent, NotFoundComponent, NxWelcomeComponent, TournamentAdminComponent],
  imports: [CommonModule, BrowserModule, RouterModule.forRoot(
    routes,
    { enableTracing: true} // TODO: disable enableTracing again
  )],
  bootstrap: [AppComponent]
})
export class AppModule {}
