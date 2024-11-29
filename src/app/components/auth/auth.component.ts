import {Component, Inject, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../custom/toast/toast.service';
import { ToastStatus } from '../custom/toast/toast.component';
import {MenuService} from "../../data/menu/menu.service";
import {BehaviorSubject, timer} from "rxjs";
import {AUTHORIZATION_TOKEN} from "../../data/tokens/tokens";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  public isRegistration = false;
  public isOblivion = {isPassword:false,isLogin:false,isChangePassword:false}
  public credForLogin = { login: '', password: ''};
  public credForRegistration = { login: '', password: '',secretWord:'' };
  public readonly minLengthChar = 4;
  public showPassword = false;
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

  public showHiddenPassword():void{
    this.showPassword=!this.showPassword;
  }
  public onRegistration(): void {
    if (
      this.credForRegistration.login.trim().length >= this.minLengthChar &&
      this.credForRegistration.password.trim().length >= this.minLengthChar&&this.credForRegistration.secretWord.trim().length
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
          JSON.stringify(this.credForRegistration),
        );
        this.toastService.openToast({
          title: 'Успех!',
          type: ToastStatus.success,
          description: 'Регистрация прошла успешно!',
        });
        this.isRegistration = false;
      }
    }else{
      this.toastService.openToast({
        title: 'Информация',
        type: ToastStatus.info,
        description: 'Ваших данных нехватает для создания аккаунта',
      });
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
  public onForgotLogin(): void {

  }
  public reductionPassword():void{
    if(this.credForLogin.password===this.credForRegistration.password){
    localStorage.setItem(this.credForLogin.login,JSON.stringify({...this.credForLogin}));

    this.isToggle(false)}
    else{
      this.toastService.openToast({
        title: 'Ошибка!',
        type: ToastStatus.warning,
        description: 'Пароли не совпадают',
      });
    }
  }
  public onForgotPassword(): void {
    console.log(JSON.parse(localStorage.getItem(this.credForLogin.login) as string).secretWord !== this.credForRegistration.secretWord)

    console.log(JSON.parse(localStorage.getItem(this.credForLogin.login) as string).secretWord !== this.credForRegistration.secretWord)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    JSON.parse(localStorage.getItem(this.credForLogin.login) as string).secretWord === this.credForRegistration.secretWord&&
    JSON.parse(localStorage.getItem(this.credForLogin.login) as string).login === this.credForLogin.login
      ?
      (this.isToggle(false),this.isOblivion.isChangePassword = true)
      : this.toastService.openToast({
        title: 'Ошибка!',
        type: ToastStatus.warning,
        description: 'Неправильный ввод данных!',
      });
  }
  public onLogin(): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    JSON.parse(localStorage.getItem(this.credForLogin.login) as string).login === this.credForLogin.login&&
    JSON.parse(localStorage.getItem(this.credForLogin.login) as string).password===this.credForLogin.password
      ? this.successLogin()
      : this.toastService.openToast({
          title: 'Ошибка!',
          type: ToastStatus.warning,
          description: 'Неправильный логин или пароль!',
        });
  }

  public isToggle(registration: boolean): void {
    this.credForRegistration={login: '',password: '',secretWord: ''};
    this.credForLogin={login: '',password: ''};
    this.isRegistration = registration;
    this.isOblivion.isPassword=false;
    this.isOblivion.isLogin=false
  }
}
