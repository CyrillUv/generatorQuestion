import { Component } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastService, ToastStatus } from '../../custom';
import { BanLanguageDirective, CharsLengthPipe } from '../../../shared';
import { ApiAuthService, AuthStateService, IUser } from '../services';

@Component({
  selector: 'app-auth-registration',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    NgClass,
    BanLanguageDirective,
    CharsLengthPipe,
  ],
  templateUrl: './auth-registration.component.html',
  styleUrl: '../auth.component.scss',
})
export class AuthRegistrationComponent {
  //обьект формы регистрации
  public credForRegistration = { login: '', password: '', secretWord: '' };
  //показ пароля
  public showPassword = false;
  // массив юзеров
  public allUsers!: IUser[];

  constructor(
    private toastService: ToastService,
    public authService: AuthStateService,
    public apiAuthService: ApiAuthService,
  ) {
    this.apiAuthService.getAllUsers().subscribe((res) => {
      this.allUsers = res;
    });
  }

  //показ-скрытие пароля
  public showHiddenPassword(): void {
    this.showPassword = !this.showPassword;
  }

  //переход на страницу login
  public inLogin(): void {
    this.authService.setRegistration(false);
  }

  //регистрация пользователя
  public onRegistration(): void {
    //если поля формы заполнены и их кол-во символом отвечает требованиям,проходим в следующее условие
    if (
      this.credForRegistration.login.trim().length >=
        this.authService.minLengthChar &&
      this.credForRegistration.password.trim().length >=
        this.authService.minLengthChar &&
      this.credForRegistration.secretWord.trim().length
    ) {
      //если такой логин найден
      if (
        this.allUsers.some(
          (user) => user.login === this.credForRegistration.login,
        )
      ) {
        this.toastService.openToast({
          title: 'Ошибка',
          type: ToastStatus.error,
          description: 'Такой пользователь уже существует',
        });
      } else {
        //иначе регистрируем пользователя
        this.apiAuthService
          .postUser({
            login: this.credForRegistration.login.trim(),
            password: this.credForRegistration.password.trim(),
            secretWord: this.credForRegistration.secretWord.trim(),
          })
          .subscribe();

        this.toastService.openToast({
          title: 'Успех!',
          type: ToastStatus.success,
          description: 'Регистрация прошла успешно!',
        });
        //переход к логинизации
        this.credForRegistration = { login: '', password: '', secretWord: '' };
        this.inLogin();
      }
    } else {
      this.toastService.openToast({
        title: 'Ошибка',
        type: ToastStatus.error,
        description: 'Данных не хватает для создания пользователя',
      });
    }
  }
}
