import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class AuthStateService {
  //минимальная длина вводных данных в форме регистрации
  public readonly minLengthChar = 4;
  //сложность пароля
  public passwordComplexity!: 'strong' | 'medium' | 'weak' | null;

  public setPasswordComplexity(passwordComplexity: 'strong' | 'medium' | 'weak' | null):void{
    this.passwordComplexity = passwordComplexity;
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
