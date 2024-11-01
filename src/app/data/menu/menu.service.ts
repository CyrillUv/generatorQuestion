import { Injectable } from '@angular/core';

import { IQuestion } from '../question/type';
import { dataMenu } from './data-menu';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  //текущее кол-во вопросов
  private _currentNumOfQuestions = '20';
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
  public getData() {
    return dataMenu;
  }
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
  public getCurrentNumOfQuestions(): number {
    return +this._currentNumOfQuestions;
  }
  public setCurrentBlockTests(blockTests: string): void {
    this._currentBlockTests = blockTests;
  }
  public setCurrentNumOfQuestions(numOfQuestions: number): void {
    this._currentNumOfQuestions = numOfQuestions + '';
  }
}
