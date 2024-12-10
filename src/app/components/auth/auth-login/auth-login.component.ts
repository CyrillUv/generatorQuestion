import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ToastStatus} from "../../custom/toast/toast.component";
import {Router} from "@angular/router";
import {ToastService} from "../../custom/toast/toast.service";
import {AUTHORIZATION_TOKEN} from "../../../data/tokens/tokens";
import {BehaviorSubject, timer} from "rxjs";
import {BanLanguageDirective} from "../../../shared/ban-language.directive";
import {CharsLengthPipe} from "../../../shared/chars-length-sampling.pipe";
import {AuthStateService} from "../services/auth-state.service";
import {ApiAuthService, IUser} from "../services/api-auth.service";

@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [NgIf, FormsModule, BanLanguageDirective, CharsLengthPipe],
  templateUrl: './auth-login.component.html',
  styleUrl: '../auth.component.scss',
})
export class AuthLoginComponent implements OnInit{

  @Input({ required: true }) public inputCredential!: boolean;

  @Output() public isRegistrationEmitter: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() public inputCredentialEmitter: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  //показ пароля
  public showPassword = false;
  //обьект формы логинизации
  public credForLogin = { login: '', password: '' };
  public allUsers:IUser[] = []
  constructor(
    private router: Router,private authService:AuthStateService,
    private toastService: ToastService,
    private apiAuthService: ApiAuthService,
    @Inject(AUTHORIZATION_TOKEN) private authToken$: BehaviorSubject<boolean>,
  ) {}
  ngOnInit(){
    this.apiAuthService.getAllUsers().subscribe(res => {
      this.allUsers = res
      console.log(this.allUsers)
    })
  }

  //получение данных из хранилища
  public getStorage(key: string): string {
    return localStorage.getItem(key) as string;
  }
  public showHiddenPassword(): void {
    this.showPassword = !this.showPassword;
  }
  public inRegistration(): void {
    this.isRegistrationEmitter.emit();
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
    // this.authService.setCurrentUserLogin(this.credForLogin.login);
    // this.authService.enableDisableAdministratorMode(true);
    this.apiAuthService.postCurrentUser(this.credForLogin).subscribe();

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
      localStorage.setItem('isLogin', 'false');
      this.authToken$.next(false);
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
    // if (
    //   (localStorage.getItem(this.credForLogin.login) as string) &&
    //   JSON.parse(this.getStorage(this.credForLogin.login)).login ===
    //     this.credForLogin.login &&
    //   JSON.parse(this.getStorage(this.credForLogin.login)).password ===
    //     this.credForLogin.password
    // ) {
    //   //успешная логинка
    //   this.successLogin();
    // }
    if(this.allUsers.some(user=>user.login === this.credForLogin.login
      &&user.password===this.credForLogin.password)){
      this.successLogin();
    }
  }
}
