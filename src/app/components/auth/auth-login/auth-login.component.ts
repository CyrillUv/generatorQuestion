import { Component, Inject, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService, ToastStatus } from '../../custom';
import { Router } from '@angular/router';
import { AUTHORIZATION_TOKEN$, CURRENT_USER_TOKEN$ } from '../../../data';
import { BehaviorSubject, switchMap, tap, timer } from 'rxjs';
import {
  BanLanguageDirective,
  CharsLengthPipe,
  InputDelayDirective,
} from '../../../shared';
import {
  ApiAuthService,
  AuthStateService,
  ICurrentUser,
  IProfile,
  IUser,
} from '../services';
import { ApiProfileService } from '../../profile/services/api-profile.service';
import { ProfileStateService } from '../../profile/services/profile-state.service';

@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    BanLanguageDirective,
    CharsLengthPipe,
    InputDelayDirective,
  ],
  templateUrl: './auth-login.component.html',
  styleUrl: '../auth.component.scss',
})
export class AuthLoginComponent implements OnInit {
  //показ пароля
  public showPassword = false;
  //обьект формы логинизации
  public credForLogin = { login: '', password: '' };
  public allUsers: IUser[] = [];

  constructor(
    private router: Router,
    public authService: AuthStateService,
    private toastService: ToastService,
    private _apiAuthService: ApiAuthService,
    @Inject(AUTHORIZATION_TOKEN$) private authToken$: BehaviorSubject<boolean>,
    @Inject(CURRENT_USER_TOKEN$)
    private _currentUser$: BehaviorSubject<ICurrentUser | null>,
    private _apiProfileService: ApiProfileService,
    private _profileStateService: ProfileStateService,
  ) {}

  ngOnInit()   {
    //получение юзеров
    this._apiAuthService.getAllUsers().subscribe((res) => {
      this.allUsers = res;
    });
  }

  public showHiddenPassword(): void {
    this.showPassword = !this.showPassword;
  }

  //успешно пройденная логинизация
  public successLogin(userId: string): void {
    this._apiAuthService
      .postCurrentUser(
        this.credForLogin,
        this.credForLogin.login === 'Matrix',
        userId,
      )
      .pipe(
        tap((currentUser) => {
          this._currentUser$.next(currentUser);
          this.authToken$.next(true);
        }),
        switchMap(() => this._apiProfileService.getProfile()),
      )
      .subscribe((profiles) => {
        if (profiles && profiles.length) {
          const currentProfile: IProfile | undefined = profiles.find(
            (el) =>
              el.userId === (this._currentUser$.value as ICurrentUser).userId,
          );

          if (currentProfile) {
            this._profileStateService.profile$.next(currentProfile);
          }
        }

        this.router.navigate(['/menu']).then((r) => r);
        this.toastService.openToast({
          title: 'Успех!',
          type: ToastStatus.success,
          description:
            'Вход прошел успешно! ' +
            this.getTime() +
            ' ' +
            'Время сессии:1 час',
        });
      });

    //пользователь авторизован,через 45 минут вылетет предупреждение

    //Todo service
    timer(2700000).subscribe(() => {
      this.toastService.openToast({
        title: 'Информация!',
        type: ToastStatus.info,
        description: 'До конца сессии осталось менее 15 минут',
      });
    });
    //через еще 15 минут закончится сессия
    timer(3600000).subscribe(() => {
      this.toastService.openToast({
        title: 'Важная информация!',
        type: ToastStatus.warning,
        description: 'Время сессии закончилось!',
      });

      this._apiAuthService
        .deleteCurrentUser((this._currentUser$.value as IUser).id as string)
        .subscribe(() => {
          this.authToken$.next(false);
          this._currentUser$.next(null);
          // this._router.navigate(['/auth']).then((r) => r);
        });
    });
  }

  private getTime(): string {
    //время для показа в тосте
    return (
      new Date().getHours() +
      ':' +
      new Date().getMinutes() +
      ':' +
      new Date().getSeconds()
    );
  }

  //логинизация пользователя
  public onLogin(): void {
    //если данных нет
    if (
      !this.credForLogin.login.trim().length ||
      !this.credForLogin.password.trim().length
    ) {
      this.toastService.openToast({
        title: 'Информация!',
        type: ToastStatus.info,
        description: 'Заполните все поля ввода',
      });
    }

    //если все данные верны
    if (
      this.allUsers.some(
        (user) =>
          user.login === this.credForLogin.login &&
          user.password === this.credForLogin.password,
      )
    ) {
      const currentUser = this.allUsers.find(
        (el) => el.login === this.credForLogin.login,
      ) as IUser;
      this.successLogin(currentUser.id as string);
    }
    //если данные не прошли проверку
    else {
      this.toastService.openToast({
        title: 'Ошибка!',
        type: ToastStatus.warning,
        description: 'Неправильный логин или пароль!',
      });
    }
  }
}
