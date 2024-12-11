import { Component, Inject, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastStatus } from '../../custom/toast/toast.component';
import { Router } from '@angular/router';
import { ToastService } from '../../custom/toast/toast.service';
import { AUTHORIZATION_TOKEN } from '../../../data/tokens/tokens';
import { BehaviorSubject, timer } from 'rxjs';
import { BanLanguageDirective } from '../../../shared/ban-language.directive';
import { CharsLengthPipe } from '../../../shared/chars-length-sampling.pipe';
import { AuthStateService } from '../services/auth-state.service';
import { ApiAuthService, IUser } from '../services/api-auth.service';

@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [NgIf, FormsModule, BanLanguageDirective, CharsLengthPipe],
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
    private apiAuthService: ApiAuthService,
    @Inject(AUTHORIZATION_TOKEN) private authToken$: BehaviorSubject<boolean>,
  ) {}

  ngOnInit() {
    //получение юзеров
    this.apiAuthService.getAllUsers().subscribe((res) => {
      this.allUsers = res;
    });
  }

  public showHiddenPassword(): void {
    this.showPassword = !this.showPassword;
  }

  //успешно пройденная логинизация
  public successLogin(): void {
    //время для показа в тосте
    const time =
      new Date().getHours() +
      ':' +
      new Date().getMinutes() +
      ':' +
      new Date().getSeconds();
    //навигация в меню
    this.router.navigate(['/menu']).then((r) => r);
    this.toastService.openToast({
      title: 'Успех!',
      type: ToastStatus.success,
      description: 'Вход прошел успешно! ' + time + ' ' + 'Время сессии:1 час',
    });
    if(this.credForLogin.login==='Matrix')
    this.apiAuthService.postCurrentUser(this.credForLogin,true).subscribe();
    else
    this.apiAuthService.postCurrentUser(this.credForLogin,false).subscribe();

    //пользователь авторизован,через 45 минут вылетет предупреждение
    this.authToken$.next(true);
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
      this.authToken$.next(false);
      this.authService.getCurrentUserId().subscribe(res=>
      {
        if(res)
        this.apiAuthService.deleteCurrentUser(res)
      })

    });

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
      this.successLogin();
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
