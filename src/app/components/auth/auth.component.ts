import {Component, Inject, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../custom/toast/toast.service';
import { ToastStatus } from '../custom/toast/toast.component';
import {MenuService} from "../../data/menu/menu.service";
import {BehaviorSubject, timer} from "rxjs";
import {AUTHORIZATION_TOKEN} from "../../data/tokens/tokens";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  public isRegistration = false;
  public credForLogin = { login: '', password: '' };
  public credForRegistration = { login: '', password: '' };
  public readonly minLengthChar = 4;
  constructor(
    private router: Router,
    private toastService: ToastService,
    private ms: MenuService,
    @Inject(AUTHORIZATION_TOKEN) private authToken$: BehaviorSubject<boolean>,
  ) {}

  ngOnInit(): void {
    localStorage.setItem('isLogin','false');
    this.authToken$.next(false);
  }

  public onRegistration(): void {
    if (
      this.credForRegistration.login.trim().length >= this.minLengthChar &&
      this.credForRegistration.password.trim().length >= this.minLengthChar
    ) {
      if (localStorage.getItem(this.credForRegistration.login)) {
        this.toastService.openToast({
          title: 'Информация',
          type: ToastStatus.info,
          description: 'Такой аккаунт существует',
        });
      } else {
        //todo нужно закидыввать весь обьект в джесон стрингиафай
        localStorage.setItem(
          this.credForRegistration.login,
          this.credForRegistration.password,
        );
        this.toastService.openToast({
          title: 'Успех!',
          type: ToastStatus.success,
          description: 'Регистрация прошла успешно!',
        });
        this.credForRegistration = { login: '', password: '' };
        this.isRegistration = false;
      }
    }
  }
  public successLogin(): void {
    const time =
      new Date().getHours() +
      ':' +
      new Date().getMinutes() +
      ':' +
      new Date().getSeconds();
    this.router.navigate(['/menu']).then((r) => r);
    this.toastService.openToast({
      title: 'Успех!',
      type: ToastStatus.success,
      description: 'Вход прошел успешно! ' + time + ' ' + 'Время сессии:1 час',
    });
    // this.ms.setAuthorized(true)
    localStorage.setItem('isLogin', 'true');

    this.authToken$.next(true);
    // AUTHORIZATION_TOKEN.subscribe(res=>this.ms.setAuthorized(res))
    timer(2700000).subscribe(() => {
      this.toastService.openToast({
        title: 'Информация!',
        type: ToastStatus.info,
        description: 'До конца сессии осталось менее 15 минут',
      });
    });
    timer(3600000).subscribe(() => {
      this.toastService.openToast({
        title: 'Важная информация!',
        type: ToastStatus.warning,
        description: 'Время сессии закончилось!',
      });
      // this.ms.setAuthorized(false)
      localStorage.setItem('isLogin', 'false');
      this.authToken$.next(false);
    });
  }
  public onLogin(): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    localStorage.getItem(this.credForLogin.login) === this.credForLogin.password
      ? this.successLogin()
      : this.toastService.openToast({
          title: 'Ошибка!',
          type: ToastStatus.warning,
          description: 'Неправильный логин или пароль!',
        });
  }
}
