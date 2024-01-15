import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, UrlSegment, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class LoginGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    return this.authService.checkAuthentiaction()
      .pipe(
        tap( ( isAuthenticated ) => {
          if( isAuthenticated ) this.router.navigate(['./heroes/list']);
        }),
        map( (isAutheticated) => !isAutheticated )
      )
  }

}
