import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IQuestion, IQuestionDB } from '../question/type';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiQuestionsService {
  private _baseUrl = 'http://localhost:3000';

  public setCache(
    key: string,
    mode: 'delete' | 'add',
    body: string | IQuestionDB,
  ): void {
    if (!this.cacheState[key]) return;

    if (mode === 'delete') {
      this.cacheState[key] = this.cacheState[key].filter(
        (el) => el.id !== body,
      );
    }

    if (mode === 'add') {
      this.cacheState[key].push(<IQuestionDB>body);
    }
  }

  private cacheState: Record<string, IQuestionDB[]> = {};

  constructor(private http: HttpClient) {}

  public getQuestionsCurrentCategory(
    endpoint: string,
  ): Observable<IQuestionDB[]> {
    if (this.cacheState[endpoint]) {
      console.log(this.cacheState[endpoint]);
      return of(this.cacheState[endpoint]);
    }
    return this.http.get<IQuestionDB[]>(`${this._baseUrl}${endpoint}`).pipe(
      tap((res) => {
        this.cacheState[endpoint] = res;
        console.log(this.cacheState[endpoint]);
      }),
    );
  }

  //TODO: object body
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

  public patchQuestion(
    endpoint: string,
    item: IQuestionDB,
  ): Observable<IQuestion> {
    return this.http.patch<IQuestionDB>(`${this._baseUrl}${endpoint}`, item);
  }

  public deleteQuestion(endpoint: string) {
    return this.http.delete<IQuestionDB>(`${this._baseUrl}${endpoint}`);
  }
}
