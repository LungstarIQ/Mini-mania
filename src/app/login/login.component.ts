import { Component, NgModule } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(private auth: AuthService) {}

  loginEmail() {
    this.auth.loginWithEmail(this.email, this.password);
  }

  loginGoogle() {
    this.auth.loginWithGoogle();
  }

  loginGuest() {
    this.auth.loginAsGuest();
  }
}
