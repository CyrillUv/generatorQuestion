import { Injectable } from '@angular/core';

import { IQuestion } from '../question';
import { dataMenu, IOptions } from './data-menu';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  //текущее кол-во вопросов
  private _currentNumOfQuestions: IOptions | null = null;
  //текущий блок тестов
  private _currentBlockTests = '1';
  //режим настроек
  private _settingMode: boolean | null = null;
  //открытие/закрытие модалки
  private _activeModal = false;
  //направление пути после настроек
  private _route: '/questions' | '/testing' = '/questions';
  //массив прошедших вопросов
  private _passedQuestions: IQuestion[] = [];
  //состояние тогла
  private _valueToggle: boolean | null = null;
  //флаг авторизации
  // private _isAuthorized = false;
  public getData() {
    console.log(dataMenu);
    return dataMenu;
  }
//   public getAuthorized():boolean{
//     return this._isAuthorized || localStorage.getItem('isAuthorized') === 'true';
// }
  public getSettingMode(): boolean | null {
    return this._settingMode;
  }
  public setSettingMode(settingMode: boolean | null): void {
    this._settingMode = settingMode;
  }
  public getValueToggle(): boolean | null {
    return this._valueToggle;
  }
  public setValueToggle(value: boolean | null): void {
    this._valueToggle = value;
  }

  public getActiveModal(): boolean {
    return this._activeModal;
  }
  public setActiveModal(activeModal: boolean): void {
    this._activeModal = activeModal;
  }
  public getPassedQuestions(): IQuestion[] {
    return this._passedQuestions;
  }
  //обнуление прошедших вопросов
  public nullingPassedQuestions(): void {
    this._passedQuestions = [];
  }
  // public setAuthorized(auth:boolean):void{
  //   this._isAuthorized = auth;
  //   if (auth) {
  //     localStorage.setItem('isAuthorized', 'true');
  //   } else {
  //     localStorage.removeItem('isAuthorized');
  //   }
  // }
  public setPassedQuestions(passedQuestions: IQuestion): void {
    this._passedQuestions.push(passedQuestions);
  }
  public getRoute(): '/questions' | '/testing' {
    return this._route;
  }
  public setRoute(route: '/questions' | '/testing'): void {
    this._route = route;
  }
  public getCurrentBlockTests(): number {
    return +this._currentBlockTests;
  }
  public getCurrentNumOfQuestions(): IOptions | null {
    return this._currentNumOfQuestions;
  }
  public setCurrentBlockTests(blockTests: string): void {
    this._currentBlockTests = blockTests;
  }
  public setCurrentNumOfQuestions(numOfQuestions: IOptions | null): void {
    this._currentNumOfQuestions = numOfQuestions;
  }
}
