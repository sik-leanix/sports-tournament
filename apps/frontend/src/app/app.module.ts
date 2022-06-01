import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { NotFoundComponent } from './not-found/not-found.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { TournamentAdminModule } from './tournament-admin/tournament-admin.module';
import { TournamentFormComponent } from './tournament-admin/tournament-form/tournament-form.component';
import { TournamentAdminComponent } from './tournament-admin/tournament-admin-container/tournament-admin.component';
@NgModule({
  declarations: [AppComponent, NotFoundComponent, NxWelcomeComponent, TournamentFormComponent, TournamentAdminComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: false } // TODO: disable enableTracing again
    ),
    BrowserAnimationsModule
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
