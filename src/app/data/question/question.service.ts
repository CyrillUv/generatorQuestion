import { Injectable } from '@angular/core';
import { dataQuestion } from './data-question';
import { IDataQuest, IQuestion, NameDataType } from './type';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  public id = false;
  public arrayTime: number[] = [];
  public arrayOfUnanswered: IQuestion[] = [];
  public allQuestions!: IQuestion[];
  private _actualQuestions: IQuestion[] = [];
  private _data = dataQuestion;
  private _statistic = '0';

  public getArrayTime(): number[] {
    return this.arrayTime;
  }
  public getActualQuestions(): IQuestion[] {
    return this._actualQuestions;
  }
  public setActualQuestions(actualQuestions: IQuestion[]): void {
    this._actualQuestions = actualQuestions;
  }
  public getArrayOfUnanswered(): IQuestion[] {
    return this.arrayOfUnanswered;
  }

  public nullingArrayOfUnanswered(): void {
    this.arrayOfUnanswered = [];
    this.removeArrayTime();
  }
  public nullingActualQuestions(): void {
    this._actualQuestions = [];
  }
  public getCategories(): NameDataType[] {
    return this._data.map((obj) => obj.name);
  }
  public getAllQuestions(): void {
    const arr = this._data.map((el) => el.questions.map((el) => el));
    let newArray: IQuestion[] = [];
    for (let i = 0; i <= arr.length - 1; i++) {
      newArray = newArray.concat(arr[i]);
    }
    this.allQuestions = newArray;
  }
  public getQuestions(category: NameDataType): IQuestion[] {
    if (category === 'all') {
      this.getAllQuestions();
      return this.allQuestions;
    }
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
