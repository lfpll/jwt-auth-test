import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {SigninComponent} from "./signin/signin.component";
import {AppComponent} from "./app.component";

const authRoutes = [
  {path:"" , component:AppComponent},
  {path:'signin', component:SigninComponent}
]
@NgModule({
  imports:[RouterModule.forRoot(authRoutes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
