import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../custom/toast/toast.service';
import { ToastStatus } from '../custom/toast/toast.component';
import {MenuService} from "../../data/menu/menu.service";
import {timer} from "rxjs";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  public toggle = false;
  public login = { login: '', password: '' };
  public registration = { login: '', password: '' };
  public time = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
  constructor(
    private router: Router,
    private toastService: ToastService,
    private ms:MenuService
  ) {}

  public onRegistration():void {
    if(this.registration.login.trim().length>=4&&this.registration.password.trim().length>=4){
      if(localStorage.getItem(this.registration.login)){
        this.toastService.openToast({
          title: 'Информация',
          type: ToastStatus.info,
          description:'Такой аккаунт существует',
        });
      }else{
        localStorage.setItem(this.registration.login, this.registration.password);
        this.toastService.openToast({
          title: 'Успех!',
          type: ToastStatus.success,
          description:'Регистрация прошла успешно!',
        });
        this.registration = {login: '', password: ''}
        this.toggle = true
      }

    }
  }
  public successLogin():void{
    this.router.navigate(['/menu'])
    this.toastService.openToast({
      title: 'Успех!',
      type: ToastStatus.success ,
      description:'Вход прошел успешно! ' + this.time ,
    });
    this.ms.setAuthorized(true)
    timer(2700000).subscribe(()=>{
      this.toastService.openToast({
        title: 'Информация!',
        type: ToastStatus.info,
        description:'До конца сессии осталось менее 15 минут',
      });
    })
    timer(3600000).subscribe(() =>
    {
      this.toastService.openToast({
        title: 'Важная информация!',
        type: ToastStatus.warning,
        description:'Время сессии закончилось!',
      });
      this.ms.setAuthorized(false)
    });
  }
  public onLogin():void {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    localStorage.getItem(this.login.login) === this.login.password
      ?
       this.successLogin()
      : this.toastService.openToast({
        title: 'Неудача!',
        type: ToastStatus.warning,
        description:'Неправильный логин или пароль!',
      });
  }
}
