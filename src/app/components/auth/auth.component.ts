import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';
import {  RouterLink } from '@angular/router';
import { BehaviorSubject} from 'rxjs';
import { AUTHORIZATION_TOKEN$ } from '../../data';
import {AuthRestorePasswordComponent} from "./auth-restore-password";
import {AuthChangePasswordComponent} from "./auth-change-password";
import {AuthLoginComponent} from "./auth-login";
import {AuthRegistrationComponent} from "./auth-registration";
import {AuthStateService} from "./services";

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


  constructor(public authService:AuthStateService,
    @Inject(AUTHORIZATION_TOKEN$) private authToken$: BehaviorSubject<boolean>,
  ) {}

  ngOnInit(): void {
    //чек авторизации
    // if(this.authService.currentUserLogin==='ValuevLoh007'){
    //   this.authService.enableDisableAdministratorMode(false)
    // }
    this.authToken$.next(false);
  }
}
