import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {AppComponent} from "./app.component";

const authRoutes = [
  {path:"" , component:AppComponent},
]
@NgModule({
  imports:[RouterModule.forRoot(authRoutes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
