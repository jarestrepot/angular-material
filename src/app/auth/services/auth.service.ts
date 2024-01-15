import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../interfaces/user.interface';
import { environments } from 'src/enviroments/enviroments';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl = environments.baseURL;
  private user?: User ;
  constructor( private http: HttpClient ) { }


  get currentUser():User | undefined {
    if( !this.user ) return undefined;
    // Clone profundo
    return structuredClone( this.user );
  }

  login( email:string, password:string ): Observable<User> {
    return this.http.get<User>(`${ this.baseUrl }/users/1`)
      .pipe(
        tap( user => this.user = user ),
        tap( user => localStorage.setItem('token', 'Asdw1erwef3e2e')) )
  }

  checkAuthentiaction() :Observable<boolean> {

    if ( !localStorage.getItem('token') ) return of( false );

    const token = localStorage.getItem('token');

    return this.http.get<User>(`${ this.baseUrl }/users/1`)
      .pipe(
        tap(user => this.user = user),
        map(user => !!user),
        catchError(err => of(false))
      )
  }

  logout():void {
    this.user = undefined;
    localStorage.removeItem('token');
  }

}
