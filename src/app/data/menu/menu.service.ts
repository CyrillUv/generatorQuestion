import { Injectable } from '@angular/core';
import { dataMenu } from './data-menu';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private _activeNumOfQuestions = 20;
  private _activeBlockTests = 1;
  private _settingMode = false;
  private _route: '/questions' | '/testing' = '/questions';
  public getData() {
    return dataMenu;
  }
  public getSettingMode(): boolean {
    return this._settingMode;
  }
  public setSettingMode(settingMode: boolean): void {
    this._settingMode = settingMode;
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
