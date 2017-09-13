import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";

const authRoutes = [
  {path:"" , component:LoginComponent},
  {path:"register",component:RegisterComponent}
]
@NgModule({
  imports:[RouterModule.forRoot(authRoutes)],
  exports:[RouterModule]
})
export class AppRoutingModule {
}
