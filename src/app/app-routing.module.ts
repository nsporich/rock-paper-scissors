import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { GameComponent } from './components/game/game.component';
import { AuthGuard } from './guards/auth-guard.guard';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'game', component: GameComponent, canActivate : [AuthGuard] },
  { path: '**',redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
