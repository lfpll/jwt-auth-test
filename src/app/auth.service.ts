import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from "@angular/http";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';


@Injectable()

export class User {
  email: string;
  password: string;

  constructor()
  {
    this.email = '';
    this.password = '';
  }

}

export class AuthService{
  private pageURl = 'http://127.0.0.1:3000/api';
  private token: string;
  private sourceUser = new Subject<{}>();
  user$ = this.sourceUser.asObservable();
  constructor(private http: Http) { }

  // ==== LOGIN ROUTE  >>> FIX : Get Dry very similar to Register
  loginUser(user)
  {
    let body = JSON.stringify(user);
    return this.http.post(`${this.pageURl}/register`, body).map((response) => this.saveToken(response));
  }

  // ==== REGISTER ROUTE
  registerUser(user):Observable<void>{
    let body = JSON.stringify(user);
    //Send the post request and getting an token
    // ${} is a notation of TypeScript to string interpolatem
    return this.http.post(`${this.pageURl}/register`, body).map((response) => this.saveToken(response))
  }

  // ==== SAVE THE TOKEN TO THE FRONT END
  saveToken(res)
  {
    //The nodeJs Sends a object as string so we need an String to Object
    const body = JSON.parse(res['_body']);
    if(body['sucess'] == true )
    {
      this.token = body['token'];

      // >>>>>>> FIX  === Check if localStorage is a good method to token

      //Using stringfy because of the method localStorage stores strings
      localStorage.setItem('currentUser',JSON.stringify({
        user: body['user'],
        token: body['token']
      }))
    }

  }

  // ==== VERIFY === IS THE TOKEN VALID?
  verify(): Observable<Object>{
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    //Having 2 options for token
    let token = (currentUser && 'token' in currentUser)? currentUser['token'] : this.token;

    //Creating a Header with access token.

    let headers = new Headers({'x-access-token':token});
    let options = new RequestOptions({headers:headers});
    return this.http.get(`${this.pageURl}/verify`,options).map((res) => JSON.parse(res['_body']));

  }
}
