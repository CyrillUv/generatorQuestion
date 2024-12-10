import {Injectable} from "@angular/core";
import {PasswordComplexity} from "../../../utils/password-complexity";
import {ApiAuthService} from "./api-auth.service";
import {map, Observable} from "rxjs";
interface IRestorePassword{
  inputCredential: boolean,
  changePassword: boolean
}
@Injectable({providedIn: 'root'})
export class AuthStateService {
  //минимальная длина вводных данных в форме регистрации
  public readonly minLengthChar = 4;
  //режим бога
  public adminMode= false;
  //сложность пароля
  public passwordComplexity!: 'strong' | 'medium' | 'weak' | null;
  //флаг режима авторизации
  public isRegistration = false;
  //обьект отвечающий за забытие пароля isPassword-отвечает за нахождение аккаунта, isChangePassword - за изменение пароля
  public restorePassword:IRestorePassword = {
    inputCredential: false,
    changePassword: false,
  };

  constructor(private apiAuthService: ApiAuthService) {

    this.adminMode=JSON.parse(localStorage.getItem('adminMode') as string)
  }
  public getCurrentUserId(): Observable<string|null> {
    return this.apiAuthService.getCurrentUser().pipe(
      map(res => {
        if (res[0] && res[0].id) {
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
  // public enableDisableAdministratorMode(adminMode:boolean):void{
  //   if(this.currentUserLogin==='ValuevLoh007'){
  //     this.adminMode=adminMode;
  //   }
  //   localStorage.setItem('adminMode',JSON.stringify(this.adminMode));
  //
  // }
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
