import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthService implements CanActivate{
  token;
  constructor(private http: Http) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean
  {

    return true
  }

  isAuth(token: {})
  {
    return this.http.post('/auth',token)
  }
}
