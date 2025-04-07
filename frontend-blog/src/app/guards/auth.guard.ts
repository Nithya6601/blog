// import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class authGuard implements CanActivate{
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(): boolean {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };
