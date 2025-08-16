// app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { CardGameComponent } from './card-game/card-game.component';
import { RoadmapComponent } from './roadmap/roadmap.component';


export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'cardGame', component: CardGameComponent, canActivate: [AuthGuard] },
  { path: 'map', component: RoadmapComponent, canActivate: [AuthGuard] },

];
