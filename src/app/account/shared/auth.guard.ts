import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { JwtTokenService } from '../service/JwtTokenService';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private JwtToken: JwtTokenService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = window.localStorage.getItem('token');
    const tokenValido = this.JwtToken.tokenValidoENaoExpirado(token);
    if (!tokenValido) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}