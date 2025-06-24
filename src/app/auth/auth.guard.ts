import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { onAuthStateChanged } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  auth: Auth = inject(Auth);
  router: Router = inject(Router);

  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      onAuthStateChanged(this.auth as unknown as import('firebase/auth').Auth, user => {
        if (user) {
          resolve(true);
        } else {
          this.router.navigate(['/login']);
          resolve(false);
        }
      });
    });
  }
}
