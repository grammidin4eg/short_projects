import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFireAuth} from "@angular/fire/auth";
import {IError} from "../ierror";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AngularFireAuth) { }

  ngOnInit() {
  }

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  hide: boolean = true;

  lockDialog: boolean = false;

  error: IError;

  getErrorMessage(control: AbstractControl) {
    return control.hasError('required') ? 'Поле обязательно для заполнения' :
        control.hasError('email') ? 'Невалидный адрес почты' :
        control.hasError('minlength') ? `Минимальная длина пароля: ${control.errors.minlength.requiredLength} символов` :
        '';
  }

  login() {
    if (this.form.valid) {
      this.lockDialog = true;
      this.authService.auth
        .signInWithEmailAndPassword(this.form.get('email').value, this.form.get('password').value)
        .then(res => console.log('result', res) )
        .catch(error => {
          console.log('error', error);
          this.error = error;
          setTimeout(()=>{
            this.error = null;
          }, 5000);
        })
        .finally(() => {this.lockDialog = false})
    }
  }
}
