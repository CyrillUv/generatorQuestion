import { Injectable } from '@angular/core';
import { dataQuestion } from './data-question';
import { IDataQuestion, IQuestion, NameDataType } from './type';
import { IOptions } from '../menu/data-menu';
import { log } from '@angular-devkit/build-angular/src/builders/ssr-dev-server';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  //Массив с временем ответов на вопросы
  public arrayTime: number[] = [];
  //Массив неправильно отвеченных вопросов
  public arrayOfUnanswered: IQuestion[] = [];
  //Массив всех вопросов
  public allQuestions!: IQuestion[];
  //Массив актуальных(неотвеченных) вопросов
  private _actualQuestions: IQuestion[] = [];
  //Все данные вопросов
  private _data = dataQuestion;
  //Статистика времени ответов на вопросы
  private _statistic = '0';
  // массив актуальных уровней
  private _actualLevels: IOptions[] = [];
  //массив актуальных категорий
  private _actualCategories: IOptions[] = [];

  public getActualCategories(): IOptions[] {
    return this._actualCategories;
  }

  public getActualLevels(): IOptions[] {
    return this._actualLevels;
  }

  public setActualCategories(categories: IOptions[]): void {
    this._actualCategories = categories;
  }

  public setActualLevels(levels: IOptions[]): void {
    this._actualLevels = levels;
  }

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

  //Добавление в массив неотвеченных вопросов
  public addIncorrectQuestions(incorrectQuestion: IQuestion): void {
    this.arrayOfUnanswered.push(incorrectQuestion);
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

  //Формирование массива всех вопросов из обьектов данных
  public getAllQuestions(): void {
    //получение массива массивов вопросов
    const arr = this._data.map((el) => el.questions.map((el) => el));
    //цельный массив
    let newArray: IQuestion[] = [];
    for (let i = 0; i <= arr.length - 1; i++) {
      //Обьединение массивов в одно целое
      newArray = newArray.concat(arr[i]);
    }
    //присваивание значения сервисной переменной
    this.allQuestions = newArray;
  }
  public getDocuments(category: NameDataType) {
    return (this._data.find((obj) => obj.name === category) as IDataQuestion)
      .questions;
  }
  //Получение вопросов по категориям и уровням
  public getQuestions(): IDataQuestion[] {
    if (this._actualCategories.length) {
      console.log(this._actualCategories);
      return this._data.filter((el) => {
        for (let i = 0; i < this._actualCategories.length; i++) {
          this._actualCategories[i].option.includes(el.name);
        }
      });
    }
    if (this._actualLevels.length) {
      return this._data.filter((el) =>
        el.questions.map((el) => {
          for (let i = 0; i < this._actualCategories.length; i++) {
            this._actualLevels[i].option?.includes(el.level as string);
          }
        }),
      );
    }
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
