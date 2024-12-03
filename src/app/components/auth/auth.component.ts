import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../custom/toast/toast.service';
import { ToastStatus } from '../custom/toast/toast.component';
import { BehaviorSubject, timer } from 'rxjs';
import { AUTHORIZATION_TOKEN } from '../../data/tokens/tokens';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink, NgClass],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  //переменная отвечает авторизацию,если false страница логинизации,иначе регистрация
  public isRegistration = false;
  //обьект отвечающий за забытие пароля isPassword-отвечает за нахождение аккаунта, isChangePassword - за изменение пароля
  public isOblivion = {
    isPassword: false,
    isChangePassword: false,
  };
  //обьект формы логинизации
  public credForLogin = { login: '', password: '' };
  //обьект формы регистрации
  public credForRegistration = { login: '', password: '', secretWord: '' };
  //минимальная длина вводных данных в форме регистрации
  public readonly minLengthChar = 4;
  //показ пароля
  public showPassword = false;
  //сложность пароля
  public passwordComplexity!: string;

  constructor(
    private router: Router,
    private toastService: ToastService,
    @Inject(AUTHORIZATION_TOKEN) private authToken$: BehaviorSubject<boolean>,
  ) {}

  ngOnInit(): void {
    //чек авторизации
    // localStorage.setItem('isLogin', 'false');
    this.authToken$.next(false);
  }

  //определитель сложности пароля
  public determinantPasswordComplexity(): void {
    //переменная определяющая пароль сложным
    const strongPasswordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    //переменная определяющая пароль средним по сложности
    const mediumPasswordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (strongPasswordPattern.test(this.credForRegistration.password)) {
      this.passwordComplexity = 'strong';
    } else if (mediumPasswordPattern.test(this.credForRegistration.password)) {
      this.passwordComplexity = 'medium';
    } else {
      this.passwordComplexity = 'weak';
    }
  }
  //получение данных из хранилища
  public getStorage(key: string): string {
    return localStorage.getItem(key) as string;
  }
  //показ-скрытие пароля
  public showHiddenPassword(): void {
    this.showPassword = !this.showPassword;
  }

  //регистрация пользователя
  public onRegistration(): void {
    //если поля формы заполнены и их кол-во символом отвечает требованиям,проходим в следующее условие
    if (
      this.credForRegistration.login.trim().length >= this.minLengthChar &&
      this.credForRegistration.password.trim().length >= this.minLengthChar &&
      this.credForRegistration.secretWord.trim().length
    ) {
      //если такой логин найден
      if (this.getStorage(this.credForRegistration.login)) {
        this.toastService.openToast({
          title: 'Информация',
          type: ToastStatus.info,
          description: 'Такой аккаунт существует',
        });
      } else {
      //ключ:логин значение:обьект формы регистрации
        localStorage.setItem(
          this.credForRegistration.login,
          JSON.stringify(this.credForRegistration),
        );
        this.toastService.openToast({
          title: 'Успех!',
          type: ToastStatus.success,
          description: 'Регистрация прошла успешно!',
        });
        //переход к логинизации
        this.isRegistration = false;
        this.credForRegistration={login: '',password: '',secretWord: ''}
      }
    } else {
      this.toastService.openToast({
        title: 'Информация',
        type: ToastStatus.info,
        description: 'Ваших данных не хватает для создания аккаунта',
      });
    }
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
    // localStorage.setItem('isLogin', 'true');

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
      // localStorage.setItem('isLogin', 'false');
      this.authToken$.next(false);
    });
  }
  //замена нового пароля вместо старого
  public reductionPassword(): void {
    //если данные в форме заполнены и совпадают
    if (this.credForLogin.password&&this.credForRegistration.password&&this.credForLogin.password === this.credForRegistration.password) {
      //создается новый аккаунт
      const newAccount = {
        login: this.credForLogin.login,
        password: this.credForRegistration.password,
        secretWord: this.credForRegistration.secretWord,
      };
      //и отправляется в ls
      localStorage.setItem(this.credForLogin.login, JSON.stringify(newAccount));
      this.toastService.openToast({
        title: 'Успех!',
        type: ToastStatus.success,
        description: 'Пароль успешно изменён!',
      });
      this.resetForm(false);
    } else {
      this.toastService.openToast({
        title: 'Ошибка!',
        type: ToastStatus.warning,
        description: 'Пароли не совпадают или поля пустые',
      });
    }
  }
  //отрабатывает при восстановлении пароля
  public isForgotPassword(): void {
    //если поля не заполнены
    if (
      !this.credForRegistration.secretWord.length ||
      !this.credForLogin.login.length
    ) {
      this.toastService.openToast({
        title: 'Информация!',
        type: ToastStatus.info,
        description: 'Заполните все поля ввода!',
      });
      return;
    }
    //если данные с ввода и ls схожи
    if (
      JSON.parse(this.getStorage(this.credForLogin.login)) &&
      JSON.parse(this.getStorage(this.credForLogin.login)).secretWord.trim() ===
      this.credForRegistration.secretWord.trim() &&
      JSON.parse(this.getStorage(this.credForLogin.login)).login.trim() ===
      this.credForLogin.login.trim()
    ) {
      //переходим к изменению пароля
      this.isOblivion.isChangePassword = true;
      return;
    }
    //если данные не схожи
    if (
      this.getStorage(this.credForLogin.login) === null ||
      this.getStorage(this.credForRegistration.secretWord) === null
    ) {
      this.toastService.openToast({
        title: 'Ошибка!',
        type: ToastStatus.warning,
        description: 'Неправильный логин или секретное слово!',
      });
    }

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
    //если данные не прошли проверку
    if (
      this.getStorage(this.credForLogin.login) === null ||
      this.getStorage(this.credForLogin.password) === null
    ) {
      this.toastService.openToast({
        title: 'Ошибка!',
        type: ToastStatus.warning,
        description: 'Неправильный логин или пароль!',
      });
    }
    //если все верно
    if (
      this.getStorage(this.credForLogin.login) &&
      JSON.parse(this.getStorage(this.credForLogin.login)).login ===
        this.credForLogin.login &&
      JSON.parse(this.getStorage(this.credForLogin.login)).password ===
        this.credForLogin.password
    ) {
      //успешная логинка
      this.successLogin();
    }
  }
  //перезагрузка формы
  public resetForm(registration: boolean): void {
    this.credForRegistration = { login: '', password: '', secretWord: '' };
    this.credForLogin = { login: '', password: '' };
    this.isRegistration = registration;
    this.isOblivion.isPassword = false;
    this.isOblivion.isChangePassword=false
    this.passwordComplexity = ''

  }
}
