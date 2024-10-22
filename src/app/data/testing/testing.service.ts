import { Injectable } from '@angular/core';
import { IAnswer, IDataTest } from './type';
import { dataTests } from './data-testing';
import { of } from 'rxjs';

export interface IWrongTest {
  title: string;
  description: string;
  correct: boolean | undefined;
}

@Injectable({
  providedIn: 'root',
})
export class TestingService {
  //Массив прохождения каждого теста
  public arrayTime: number[] = [];
  //Массив ложно отвеченных тестов
  public arrayOfWrongTests: IWrongTest[] = [];
  //данные тестов
  private _data: IDataTest[] = dataTests;
  //Мапа успешно отвеченных тестов
  private _successTestsMap = new Map<number, IAnswer>();
  //Статистика времени всего прохождения
  private _statistic = '0';

  public getData(): IDataTest[] {
    return this._data;
  }

  public getArrayOfUnanswered(): IWrongTest[] {
    return this.arrayOfWrongTests;
  }

  public getStatistic(): string {
    return this._statistic;
  }

  public setStatistic(statistic: string): void {
    this._statistic = statistic;
  }

  //Обнуление ответов на тесты
  public nullingRequestsForTests(tests: IWrongTest[]): void {
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
  //Обнуление массива тестов
  public nullingArrayOfTests(): void {
    //Получается пустой массив ложных тестов
    this.arrayOfWrongTests = [];
    //массив времени прохождения пуст
    this.removeArrayTime();
    //создание новой мапы
    this._successTestsMap = new Map<number, IAnswer>();
  }

  public removeArrayTime() {
    this.arrayTime = [];
  }
  //изменение массива неправильно отвеченных тестов
  public changeArrayOfUnanswered(
    id: number,
    description: string,
    name: string,
  ): void {
    //Добавляет неправильные ответы для статистики
    if (this.getSuccessTestsMap().get(id)) {
      this.arrayOfWrongTests.push({
        title: name,
        correct: this.getSuccessTestsMap().get(id)?.correct,
        description: description,
      });
      this.arrayOfWrongTests = this.arrayOfWrongTests.filter(
        (el) => !el.correct,
      );
    }
  }
}
