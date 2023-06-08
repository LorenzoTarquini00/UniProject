import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAnalytics, getAnalytics } from '@angular/fire/analytics';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { providePerformance, getPerformance } from '@angular/fire/performance';
import { provideRemoteConfig, getRemoteConfig } from '@angular/fire/remote-config';
import { provideStorage, getStorage } from '@angular/fire/storage';


import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment.development';
import { FormsModule } from '@angular/forms';

import { ComponentModule } from './added-modules/component.module';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { GameComponent } from './components/game/game.component';

import { LeaderboardComponent } from './components/admin/leaderboard/leaderboard.component';





@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    LeaderboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    ComponentModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule,

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    providePerformance(() => getPerformance()),
    provideRemoteConfig(() => getRemoteConfig()),
    provideStorage(() => getStorage())
  ],
  providers: [
    AuthService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
