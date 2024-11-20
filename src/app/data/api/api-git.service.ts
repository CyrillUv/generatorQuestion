import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IQuestion, IQuestionDB } from '../question/type';

interface IGit {
  id: string;
  name: string;
  age: number;
}
export interface ICategory {
  id: string;
  name: string;
  endpoint: string;
}
@Injectable({
  providedIn: 'root',
})
export class ApiGitService {
  private _baseUrl = 'http://localhost:3000';
  private _categoriesUrl = 'http://localhost:3000/categories';
  constructor(public http: HttpClient) {}
  public getQuestionsCurrentCategory(endpoint: string) {
    return this.http.get<IQuestionDB[]>(`${this._baseUrl}${endpoint}`);
  }
  public getAllCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this._categoriesUrl}`);
  }
  public postCategory(category: ICategory): Observable<ICategory> {
    return this.http.post<ICategory>(`${this._categoriesUrl}`, category);
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
  public patchCategory(id: string, name: string) {
    return this.http.patch<ICategory>(`${this._categoriesUrl}/${id}`, { name });
  }

  public deleteCategory(id: string): Observable<ICategory> {
    return this.http.delete<ICategory>(`${this._categoriesUrl}/${id}`);
  }
  public deleteQuestion(endpoint: string) {
    return this.http.delete<IQuestionDB>(`${this._baseUrl}${endpoint}`);
  }
}

//GET /point
//GET /point/:id
//POST /point
//PUT /point/:id
//PATCH /point/:id
//DELETE /point/:id
