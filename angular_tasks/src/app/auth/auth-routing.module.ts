import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {AuthLayoutComponent} from "./auth-layout/auth-layout.component";


const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      {path: 'login', component: LoginComponent},
      {path: 'reg', component: RegistrationComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
