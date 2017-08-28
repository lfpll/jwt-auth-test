import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Http} from "@angular/http";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private http: Http) { }

  ngOnInit() {
  }

  signIn(form: NgForm)
  {
      this.http.post('/auth',{'name':form.value.name,'password':form.value.password}).subscribe((response) => console.log(response));
  }

}
