import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import {AuthRoutingModule} from "./auth-routing.module";
import {MatDividerModule} from "@angular/material/divider";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import { ErrorPanelComponent } from './error-panel/error-panel.component';


@NgModule({
  declarations: [LoginComponent, RegistrationComponent, AuthLayoutComponent, ErrorPanelComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatDividerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ]
})
export class AuthModule { }
