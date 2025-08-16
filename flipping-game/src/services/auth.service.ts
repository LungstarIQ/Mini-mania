import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signInWithPopup, GoogleAuthProvider, signInAnonymously, signInWithEmailAndPassword, onAuthStateChanged, User, setPersistence, browserLocalPersistence } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  currentUser: User | null = null;

  constructor(private auth: Auth, private router: Router) {
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser = user;
    });
  }

  // Google login
  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(this.auth, provider);
    this.router.navigate(['/home']);
  }

  // Email & password login
  async loginWithEmail(email: string, password: string) {
    await signInWithEmailAndPassword(this.auth, email, password);
    this.router.navigate(['/home']);
  }

  // Guest login (persistent)
  async loginAsGuest() {
    // Ensure the anonymous user persists across sessions
    await setPersistence(this.auth, browserLocalPersistence);
    await signInAnonymously(this.auth);
    this.router.navigate(['/home']);
  }

  // Logout
  async logout() {
    await this.auth.signOut();
    this.router.navigate(['/login']);
  }

  // Check if logged in
  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }
}
