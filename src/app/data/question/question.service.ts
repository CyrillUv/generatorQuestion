import { Injectable } from '@angular/core';
import { dataQuestion } from './data-question';
import { IDataQuestion, IQuestion, NameDataType } from './type';

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
  //Получение вопросов по категориям
  public getQuestions(category: NameDataType): IQuestion[] {
    //получение всех вопросов
    if (category === 'all') {
      this.getAllQuestions();
      return this.allQuestions;
    }
    //получение вопросов по категориям
    return (this._data.find((obj) => obj.name === category) as IDataQuestion)
      .questions;
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
