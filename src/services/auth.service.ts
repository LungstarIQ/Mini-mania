import { Injectable, Inject, PLATFORM_ID, Optional } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  signInAnonymously,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
  setPersistence,
  browserLocalPersistence
} from '@angular/fire/auth';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {
  currentUser: User | null = null;
  private isBrowser: boolean;

  constructor(
    @Optional() private auth: Auth,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    // Only subscribe to Firebase Auth state on the browser
    if (this.isBrowser) {
      onAuthStateChanged(this.auth, (user) => {
        this.currentUser = user;
      });
    }
  }

  // Google login
  async loginWithGoogle() {
    if (!this.isBrowser) return;
    const provider = new GoogleAuthProvider();
    await signInWithPopup(this.auth, provider);
    this.router.navigate(['/home']);
  }

  // Email & password login
  async loginWithEmail(email: string, password: string) {
    if (!this.isBrowser) return;
    await signInWithEmailAndPassword(this.auth, email, password);
    this.router.navigate(['/home']);
  }

  // Guest login (persistent)
  async loginAsGuest() {
    if (!this.isBrowser) return;
    await setPersistence(this.auth, browserLocalPersistence);
    await signInAnonymously(this.auth);
    this.router.navigate(['/home']);
  }

  // Logout
  async logout() {
    if (!this.isBrowser) return;
    await this.auth.signOut();
    this.router.navigate(['/login']);
  }

  // Check if logged in
  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }
}