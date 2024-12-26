import {Inject, Injectable} from "@angular/core";
import {PasswordComplexity} from "../../../utils";
import {ApiAuthService, IUser} from "./api-auth.service";
import {BehaviorSubject, map, Observable} from "rxjs";

import {CURRENT_USER_TOKEN$} from "../../../data";
export interface IRestorePassword{
  inputCredential: boolean,
  changePassword: boolean
}
@Injectable({providedIn: 'root'})
export class AuthStateService {
  //минимальная длина вводных данных в форме регистрации
  public readonly minLengthChar = 4;

  //сложность пароля
  public passwordComplexity!: 'strong' | 'medium' | 'weak' | null;
  //флаг режима авторизации
  public isRegistration = false;
  //обьект отвечающий за забытие пароля isPassword-отвечает за нахождение аккаунта, isChangePassword - за изменение пароля
  public restorePassword:IRestorePassword = {
    inputCredential: false,
    changePassword: false,
  };

  constructor(private apiAuthService: ApiAuthService,
              @Inject(CURRENT_USER_TOKEN$) private currentUser$: BehaviorSubject<IUser>
  ) {}
  public getCurrentUserId(): Observable<string|null> {
    const userId = this.currentUser$.value.id as string
    return this.apiAuthService.getCurrentUser().pipe(
      map(res => {
        if (res[0] && res[0].id) {
          this.currentUser$.next({...this.currentUser$.value,id:userId });
          return res[0].id;
        }
        return null; // Или другое значение по умолчанию, если id отсутствует
      })
    );
  }
  public setChangePassword(changePassword:boolean){
    this.restorePassword.changePassword = changePassword
  }
  public setInputCredential(inputCredential:boolean){
    this.restorePassword.inputCredential = inputCredential
  }
  public setPasswordComplexity(passwordComplexity: 'strong' | 'medium' | 'weak' | null):void{
    this.passwordComplexity = passwordComplexity;
  }
  public setRegistration(value:boolean):void{
    this.isRegistration = value
  }
  //определитель сложности пароля
  public determinantPasswordComplexity(password:string): void {
    if(!password) return;
    this.setPasswordComplexity(PasswordComplexity.determinantPasswordComplexity(password))
  }
  public getPasswordComplexityStrong():boolean {
    return this.passwordComplexity === 'strong'
  }
  public getPasswordComplexityMedium():boolean {
    return  this.passwordComplexity === 'medium'
  }
  public getPasswordComplexityWeak(password:string): string | false {
    return this.passwordComplexity === 'weak'&&password
  }
}
