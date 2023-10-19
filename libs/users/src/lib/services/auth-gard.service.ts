import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LocalStorageServiceService } from './local-storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGardService  {

  constructor(private router: Router, private localStorageToken: LocalStorageServiceService) { 
    console.log()
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.localStorageToken.getToken();
    // if isAdmin, allow access to the URL
    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      if (tokenDecode.isAdmin && !this._tokenIsExpired(tokenDecode.exp)) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  private _tokenIsExpired(expriration: number): boolean{
    return Math.floor(new Date().getTime() / 1000) >= expriration;
  }
}
