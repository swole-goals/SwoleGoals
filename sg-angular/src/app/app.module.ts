import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { GithubStatsComponent } from './github-stats/github-stats.component';
import { MapComponent } from './map/map.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ExerciseListComponent } from './exercise-list/exercise-list.component';
import { ExerciseTableComponent } from './exercise-table/exercise-table.component';
import { SplashComponent } from './splash/splash.component';
import { DynamiSocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'ng-dynami-social-login';
import { ChallengeCreationMenuComponent } from './challenge-creation-menu/challenge-creation-menu.component';

//import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
//import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider} from "angularx-social-login";
import { MatTableModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSliderModule, MatCheckboxModule,
MatListModule } from '@angular/material';
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


import { ChartModule } from 'angular-highcharts';
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("276075475404-gjouku37354fsjqrm631f9q9s29vm3im.apps.googleusercontent.com")
        }
        
      ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    GithubStatsComponent,
    MapComponent,
    UserProfileComponent,
    ExerciseListComponent,
    SplashComponent,
    ChallengeCreationMenuComponent,
    ExerciseTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DynamiSocialLoginModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatCheckboxModule,
    MatListModule,
    FormsModule,
    ChartModule,
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
        path: 'app-exercise-table',
        component: ExerciseTableComponent
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
      },
      {
        path: 'app-challenge-creation-menu',
        component: ChallengeCreationMenuComponent
      }
    ]),
  ],
  exports: [RouterModule],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
