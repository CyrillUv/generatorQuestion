import {Component, EventEmitter, Output} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastStatus} from "../../custom/toast/toast.component";
import {ToastService} from "../../custom/toast/toast.service";
import {BanLanguageDirective} from "../../../shared/ban-language.directive";
import {CharsLengthPipe} from "../../../shared/chars-length-sampling.pipe";
import {AuthStateService} from "../services/auth-state.service";


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
  @Output() public determinantPasswordComplexityEmitter: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() public isRegistrationEmitter: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  //обьект формы регистрации
  public credForRegistration = { login: '', password: '', secretWord: '' };
  //показ пароля
  public showPassword = false;
  constructor(private toastService: ToastService,public authService: AuthStateService) {}

  //показ-скрытие пароля
  public showHiddenPassword(): void {
    this.showPassword = !this.showPassword;
  }

  public determinantPasswordComplexity(): void {
    this.determinantPasswordComplexityEmitter.emit(
      this.credForRegistration.password,
    );
  }

  public inLogin(): void {
    this.isRegistrationEmitter.emit();
  }
  //регистрация пользователя
  public onRegistration(): void {
    //если поля формы заполнены и их кол-во символом отвечает требованиям,проходим в следующее условие
    if (
      this.credForRegistration.login.trim().length >= this.authService.minLengthChar &&
      this.credForRegistration.password.trim().length >= this.authService.minLengthChar &&
      this.credForRegistration.secretWord.trim().length
    ) {
      //если такой логин найден
      if (localStorage.getItem(this.credForRegistration.login) as string) {
        this.toastService.openToast({
          title: 'Ошибка',
          type: ToastStatus.error,
          description: 'Такой пользователь уже существует',
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
