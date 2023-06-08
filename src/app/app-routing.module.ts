import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NoAccessComponent } from './components/no-access/no-access.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { GameComponent } from './components/game/game.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { LeaderboardComponent } from './components/admin/leaderboard/leaderboard.component';

const routes: Routes = [ //paths
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'game', component: GameComponent, canActivate: [AuthGuard] }, //only loged in users can procede here
  { path: 'leaderboard', component: LeaderboardComponent, canActivate: [AuthGuard, AdminGuard] }, //only loged in users with admin status can procede here
  { path: 'no-acces', component: NoAccessComponent, canActivate: [AuthGuard] }, //only loged in users can procede here
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
