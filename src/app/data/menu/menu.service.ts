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
  private _activeModal = false;
  private _route: '/questions' | '/testing' = '/questions';
  private _passedQuestions: IQuestion[] = [];
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
    console.log('_valueToggle', this._valueToggle);
    return this._valueToggle;
  }
  public setValueToggle(value: boolean | null): void {
    console.log('_valueToggle', this._valueToggle);
    this._valueToggle = value;
    console.log(this._valueToggle);
  }

  public getActiveModal(): boolean {
    return this._activeModal;
  }
  public setActiveModal(activeModal: boolean): void {
    this._activeModal = activeModal;
    console.log(this._activeModal);
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
