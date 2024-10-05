import { Injectable } from '@angular/core';
import { dataMenu } from './data-menu';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private _activeNumOfQuestions = 20;
  private _activeBlockTests = 1;
  public getData() {
    return dataMenu;
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
