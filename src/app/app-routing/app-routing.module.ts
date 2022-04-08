import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "../home/home.component";
import { LoginComponent } from "../login/login.component";
import { RegisterComponent } from "../register/register.component"

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },

  {
    path: "register-user",
    component: RegisterComponent,
  },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "**",
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
