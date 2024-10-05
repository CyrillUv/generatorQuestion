import { Injectable } from '@angular/core';
import { dataQuestion } from './data-question';
import { IDataQuest, IQuestion, NameDataType } from './type';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  public id = false;
  private _data = dataQuestion;
  private _statistic = '0';
  public arrayTime: number[] = [];
  public arrayOfUnanswered: IQuestion[] = [];

  public getArrayTime(): number[] {
    return this.arrayTime;
  }

  public getArrayOfUnanswered(): IQuestion[] {
    return this.arrayOfUnanswered;
  }

  public nullingArrayOfUnanswered(): void {
    this.arrayOfUnanswered = [];
    this.removeArrayTime();
  }

  public getCategories(): NameDataType[] {
    return this._data.map((obj) => obj.name);
  }

  public getQuestions(category: NameDataType): IQuestion[] {
    return (this._data.find((obj) => obj.name === category) as IDataQuest)
      .questions;
  }

  public getData(): IDataQuest[] {
    return this._data;
  }

  public getStatistic(): string {
    return this._statistic;
  }

  public setStatistic(statistic: string): void {
    this._statistic = statistic;
  }

  public removeArrayTime() {
    this.arrayTime = [];
  }
}
