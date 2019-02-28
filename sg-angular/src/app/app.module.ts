import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { GithubStatsComponent } from './github-stats/github-stats.component';
import { MapComponent } from './map/map.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ExerciseListComponent } from './exercise-list/exercise-list.component';
import { SplashComponent } from './splash/splash.component';

@NgModule({
  declarations: [
    AppComponent,
    GithubStatsComponent,
    MapComponent,
    UserProfileComponent,
    ExerciseListComponent,
    SplashComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'app-github-stats',
        component: GithubStatsComponent
      },
      {
        path: 'app-user-profile',
        component: UserProfileComponent
	    },
      {
        path: 'app-exercise-list',
        component: ExerciseListComponent
      },
      {
        path: 'app-map',
        component: MapComponent
      },
      {
        path: 'app-splash',
        component: SplashComponent
      },
      {
        path: '',
        component: SplashComponent
      }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
