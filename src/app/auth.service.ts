import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {User} from './user';

@Injectable()


export class AuthService {
  private pageURl = window.location.origin + '/auth/user';
  private token: string;
  private sourceUser = new Subject<{}>();

  user$ = this.sourceUser.asObservable();
  constructor(private http: Http) { }

  // ==== LOGIN ROUTE  >>> FIX : Get Dry, function very similar to Register
  loginUser(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = ({headers: headers});
    return this.http.post(`${this.pageURl}/login`, body, options).map((response) => this.saveToken(response));
  }

  // ==== REGISTER ROUTE
  registerUser(user: User): Observable<void> {
    const body = JSON.stringify(user);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = ({headers: headers});
    // Send the post request and getting an token
    // ${} is a notation of TypeScript to string interpolatem
    return this.http.post(`${this.pageURl}/register`, body, options).map((response) => this.saveToken(response));
  }

  // ==== SAVE THE TOKEN TO THE FRONT END
  saveToken(res) {
    // The nodeJs Sends a object as string so we need an String to Object
    const body = JSON.parse(res['_body']);
    if (body['sucess'] === true ) {
      this.token = body['token'];

      // >>>>>>> FIX  === Check if localStorage is a good method to token

      // Using stringfy because of the method localStorage stores strings
      localStorage.setItem('currentUser', JSON.stringify({
        user: body['user'],
        token: body['token']
      }));
    }
    return body;
  }

  // ==== VERIFY === IS THE TOKEN VALID?f
  verify(): Observable<Object> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Having 2 options for token
    const token = (currentUser && 'token' in currentUser) ? currentUser['token'] : this.token;

    // Creating a Header with access token.

    const headers = new Headers({'x-token-validation': token});
    const options = new RequestOptions({headers: headers});
    return this.http.get(`${this.pageURl}/verify`, options).map((res) => JSON.parse(res['_body']));

  }
}
