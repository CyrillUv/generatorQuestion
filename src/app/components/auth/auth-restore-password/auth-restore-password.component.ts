import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

import { ToastStatus } from '../../custom/toast/toast.component';
import { ToastService } from '../../custom/toast/toast.service';
import { BanLanguageDirective } from '../../../shared/ban-language.directive';
import { CharsLengthPipe } from '../../../shared/chars-length-sampling.pipe';
import {ApiAuthService, IUser} from "../services/api-auth.service";
import {AuthStateService} from "../services/auth-state.service";

@Component({
  selector: 'app-auth-restore-password',
  standalone: true,
  imports: [FormsModule, NgIf, BanLanguageDirective, CharsLengthPipe],
  templateUrl: './auth-restore-password.component.html',
  styleUrl: '../auth.component.scss',
})
export class AuthRestorePasswordComponent implements OnInit{
  //данные для восстановления пароля
  public credForRestorePassword = { login: '', secretWord: '' };
  //все пользователи
  public allUsers!:IUser[]
  constructor(public toastService: ToastService,
              private apiAuthService: ApiAuthService,
              private authService:AuthStateService ) {}
  ngOnInit(){
    this.apiAuthService.getAllUsers().subscribe(res=>{
      this.allUsers = res;
    })
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
    if(this.allUsers.some(user=>user.login === this.credForRestorePassword.login
      &&user.secretWord===this.credForRestorePassword.secretWord))
    {
      const user = this.allUsers.find(user=>user.login === this.credForRestorePassword.login
        &&user.secretWord===this.credForRestorePassword.secretWord)
      this.apiAuthService.postCurrentUser(user as IUser,false).subscribe()
      //переходим к изменению пароля
      this.authService.setChangePassword(true);
      return;
    }
    //если данные не схожи
    else {
      this.toastService.openToast({
        title: 'Ошибка!',
        type: ToastStatus.warning,
        description: 'Неправильный логин или секретное слово!',
      });
    }
  }
}
