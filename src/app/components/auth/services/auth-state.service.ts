import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class AuthStateService {
  //минимальная длина вводных данных в форме регистрации
  public readonly minLengthChar = 4;
  //режим бога
  public adminMode= false;
  //сложность пароля
  public passwordComplexity!: 'strong' | 'medium' | 'weak' | null;
  //логин текущего юзера
  public currentUserLogin=''

  constructor() {

    this.adminMode=JSON.parse(localStorage.getItem('adminMode') as string)
  }
  public setPasswordComplexity(passwordComplexity: 'strong' | 'medium' | 'weak' | null):void{
    this.passwordComplexity = passwordComplexity;
  }
  public setCurrentUserLogin(username:string):void{
    this.currentUserLogin = username;
  }
  public enableDisableAdministratorMode(adminMode:boolean):void{
    if(this.currentUserLogin==='ValuevLoh007'){
      this.adminMode=adminMode;
    }
    localStorage.setItem('adminMode',JSON.stringify(this.adminMode));

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
