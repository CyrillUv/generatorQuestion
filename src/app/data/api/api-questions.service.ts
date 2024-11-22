import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IQuestion, IQuestionDB } from '../question/type';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiQuestionsService {
  //хост
  private _baseUrl = 'http://localhost:3000';
  //кэш состояний
  private cacheState: Record<string, IQuestionDB[]> = {};

  constructor(private http: HttpClient) {}
  //изменение кэша
  public setCache(
    key: string,
    mode: 'delete' | 'add',
    body: string | IQuestionDB,
  ): void {
    //если такого эндпоинта нет,выходим из метода
    if (!this.cacheState[key]) return;
    //если режим удаления,фильтруем по эндпоинту и входящим
    if (mode === 'delete') {
      this.cacheState[key] = this.cacheState[key].filter(
        (el) => el.id !== body,
      );
    }
    //если режим добавления,пушим по эндпоинту входящие данные
    if (mode === 'add') {
      this.cacheState[key].push(<IQuestionDB>body);
    }
  }
  //существует ли ключ в кэше
  public existKeyInCache(key: string): boolean {
    return Object.prototype.hasOwnProperty.call(this.cacheState, key);
  }
  //запрос на вопросы по выбранной категории
  public getQuestionsCurrentCategory(
    endpoint: string,
  ): Observable<IQuestionDB[]> {
    if (this.cacheState[endpoint]) {
      return of(this.cacheState[endpoint]);
    }
    return this.http.get<IQuestionDB[]>(`${this._baseUrl}${endpoint}`).pipe(
      tap((res) => {
        this.cacheState[endpoint] = res;
      }),
    );
  }

  //TODO: object body
  //запрос на добавление вопроса
  public postQuestion(
    endpoint: string,
    title: string,
    response: string,
    level: 'Junior' | 'Middle' | 'Senior',
  ): Observable<IQuestionDB> {
    return this.http.post<IQuestionDB>(`${this._baseUrl}${endpoint}`, {
      title: title,
      response: response,
      level: level,
      active: false,
    });
  }
  //запрос на изменение вопроса
  public patchQuestion(
    endpoint: string,
    item: IQuestionDB,
  ): Observable<IQuestion> {
    return this.http.patch<IQuestionDB>(`${this._baseUrl}${endpoint}`, item);
  }
  //запрос на удаление вопроса
  public deleteQuestion(endpoint: string) {
    return this.http.delete<IQuestionDB>(`${this._baseUrl}${endpoint}`);
  }
}
