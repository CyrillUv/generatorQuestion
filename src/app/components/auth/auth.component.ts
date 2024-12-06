import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';
import {  RouterLink } from '@angular/router';
import { BehaviorSubject} from 'rxjs';
import { AUTHORIZATION_TOKEN } from '../../data/tokens/tokens';
import {AuthRestorePasswordComponent} from "./auth-restore-password/auth-restore-password.component";
import {AuthChangePasswordComponent} from "./auth-change-password/auth-change-password.component";
import {AuthLoginComponent} from "./auth-login/auth-login.component";
import {AuthRegistrationComponent} from "./auth-registration/auth-registration.component";
import {AuthStateService} from "./services/auth-state.service";
import {PasswordComplexity} from "../../utils/password-complexity";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    RouterLink,
    NgClass,
    AuthRestorePasswordComponent,
    AuthChangePasswordComponent,
    AuthLoginComponent,
    AuthRegistrationComponent,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  //переменная отвечает авторизацию,если false страница логинизации,иначе регистрация
  public isRegistration = false;
  //обьект отвечающий за забытие пароля isPassword-отвечает за нахождение аккаунта, isChangePassword - за изменение пароля
  public restorePassword = {
    inputCredential: false,
    changePassword: false,
  };


  //логин для изменения пароля
  public currentUserLogin!: string;
  constructor(public authService:AuthStateService,
    @Inject(AUTHORIZATION_TOKEN) private authToken$: BehaviorSubject<boolean>,
  ) {}

  ngOnInit(): void {
    //чек авторизации
    localStorage.setItem('isLogin', 'false');
    this.authToken$.next(false);
  }

  //todo перенести в сервис
  //определитель сложности пароля
  public determinantPasswordComplexity(password:string): void {
    if(!password) return;
    this.authService.setPasswordComplexity(PasswordComplexity.determinantPasswordComplexity(password))
  }

}
