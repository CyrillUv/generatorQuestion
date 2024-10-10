import { Injectable } from '@angular/core';

import { IQuestion } from '../question/type';
import { dataMenu } from './data-menu';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private _activeNumOfQuestions = 20;
  private _activeBlockTests = 1;
  private _settingMode: boolean | null = null;
  private _route: '/questions' | '/testing' = '/questions';
  private _passedQuestions: IQuestion[] = [];
  public getData() {
    return dataMenu;
  }
  public getSettingMode(): boolean | null {
    return this._settingMode;
  }
  public setSettingMode(settingMode: boolean | null): void {
    this._settingMode = settingMode;
  }
  public getPassedQuestions(): IQuestion[] {
    return this._passedQuestions;
  }
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
  public getActiveBlockTests(): number {
    return this._activeBlockTests;
  }
  public getActiveNumOfQuestions(): number {
    return this._activeNumOfQuestions;
  }
  public setActiveBlockTests(blockTests: number): void {
    this._activeBlockTests = blockTests;
  }
  public setActiveNumOfQuestions(numOfQuestions: number): void {
    this._activeNumOfQuestions = numOfQuestions;
  }
}
