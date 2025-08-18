// app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { FlippingGameComponent } from './flipping-game/flipping-game.component';


export const routes: Routes = [
  //{ path: '', component: LoginComponent },
  { path: '', component: FlippingGameComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '', pathMatch: 'full' }
];
