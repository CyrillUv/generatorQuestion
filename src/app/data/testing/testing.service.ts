import { Injectable } from '@angular/core';
import { IAnswer, IDataTest } from './type';
import { dataTests } from './data-testing';

export interface IWrongTest {
  title: string;
  description: string;
  correct: boolean | undefined;
}

@Injectable({
  providedIn: 'root',
})
export class TestingService {
  public arrayTime: number[] = [];
  public arrayOfWrongTest: IWrongTest[] = [];
  private _data: IDataTest[] = dataTests;
  private _successTestsMap = new Map<number, IAnswer>();
  private _statistic = '0';

  public getData(): IDataTest[] {
    return this._data;
  }

  public getArrayOfUnanswered(): IWrongTest[] {
    return this.arrayOfWrongTest;
  }

  public getStatistic(): string {
    return this._statistic;
  }

  public setStatistic(statistic: string): void {
    this._statistic = statistic;
  }

  public nullingRequestsForTest(tests: IWrongTest[]): void {
    tests.forEach((test) => {
      test.correct = false;
    });
  }

  public getSuccessTestsMap(): Map<number, IAnswer> {
    return this._successTestsMap;
  }

  public setSuccessTestsMap(key: number, value: IAnswer): void {
    this._successTestsMap.set(key, value);
  }
  public nullingArrayOfTests(): void {
    this.arrayOfWrongTest = [];
    this.removeArrayTime();
    this._successTestsMap = new Map<number, IAnswer>();
  }

  public removeArrayTime() {
    this.arrayTime = [];
  }

  public changeArrayOfUnanswered(
    id: number,
    description: string,
    name: string,
  ): void {
    if (this.getSuccessTestsMap().get(id)) {
      this.arrayOfWrongTest.push({
        title: name,
        correct: this.getSuccessTestsMap().get(id)?.correct,
        description: description,
      });
      this.arrayOfWrongTest = this.arrayOfWrongTest.filter((el) => !el.correct);
    }
  }
}
