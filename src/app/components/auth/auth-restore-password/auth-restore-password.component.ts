import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

import {ToastStatus} from "../../custom/toast/toast.component";
import {ToastService} from "../../custom/toast/toast.service";

@Component({
  selector: 'app-auth-restore-password',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './auth-restore-password.component.html',
  styleUrl: '../auth.component.scss',
})
export class AuthRestorePasswordComponent {
  //флаг перехода на изменение пароля

  @Output() public currentUserLoginEmitter:EventEmitter<string> = new EventEmitter<string>()
  @Output() public changePasswordEmitter:EventEmitter<boolean> = new EventEmitter<boolean>()
  public credForRestorePassword = {login:'',secretWord:''}

  constructor(public toastService: ToastService) {

  }
  //получение данных из хранилища
  public getStorage(key: string): string {
    return localStorage.getItem(key) as string;
  }
  public currentUserLogin(){
    this.currentUserLoginEmitter.emit(this.credForRestorePassword.login)
  }
  //отрабатывает при восстановлении пароля
  public isForgotPassword(): void {
    //если поля не заполнены
    if (
      !this.credForRestorePassword.secretWord.length ||
      !this.credForRestorePassword.login.length
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
      JSON.parse(this.getStorage(this.credForRestorePassword.login)) &&
      JSON.parse(this.getStorage(this.credForRestorePassword.login)).secretWord.trim() ===
      this.credForRestorePassword.secretWord.trim() &&
      JSON.parse(this.getStorage(this.credForRestorePassword.login)).login.trim() ===
      this.credForRestorePassword.login.trim()
    ) {
      //переходим к изменению пароля
      this.changePasswordEmitter.emit(true)
      this.currentUserLogin()
      return;
    }
    //если данные не схожи
    if (
      this.getStorage(this.credForRestorePassword.login) === null ||
      this.getStorage(this.credForRestorePassword.secretWord) === null
    ) {
      this.toastService.openToast({
        title: 'Ошибка!',
        type: ToastStatus.warning,
        description: 'Неправильный логин или секретное слово!',
      });
    }
  }

}
