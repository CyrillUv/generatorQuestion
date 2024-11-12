import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IQuestion } from '../question/type';

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
  public readonly mockObject: IGit = {
    id: '11',
    name: 'Hello World!',
    age: 23,
  };
  public readonly mockObject2: any = {};
  private _gitUrl = 'http://localhost:3000/git';
  private _baseUrl = 'http://localhost:3000';
  private _categoriesUrl = 'http://localhost:3000/categories';
  constructor(public http: HttpClient) {}
  public getQuestionsCurrentCategory(endpoint: string) {
    return this.http.get<IQuestion[]>(`${this._baseUrl}${endpoint}`);
  }
  public getAllCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this._categoriesUrl}`);
  }
  public getAllGitQuestions(): Observable<IGit[]> {
    return this.http.get<IGit[]>(`${this._gitUrl}`);
  }
  public getGitQuestion(): Observable<IGit> {
    return this.http.get<IGit>(`${this._gitUrl}/10`);
  }
  public postGitQuestion(): Observable<IGit> {
    return this.http.post<IGit>(`${this._gitUrl}`, this.mockObject);
  }
  public postCategory(category: ICategory): Observable<ICategory> {
    return this.http.post<ICategory>(`${this._categoriesUrl}`, category);
  }
  public postQuestion(
    endpoint: string,
    question: string,
    response: string,
    level: 'Junior' | 'Middle' | 'Senior',
  ) {
    return this.http.post<IQuestion>(`${this._baseUrl}${endpoint}`, {
      question: question,
      response: response,
      level: level,
      active: false,
    });
  }
  public putGitQuestion(): Observable<IGit> {
    return this.http.put<IGit>(`${this._gitUrl}/5`, this.mockObject2);
  }
  public patchCategory(id: string, name: string) {
    return this.http.patch<ICategory>(`${this._categoriesUrl}/${id}`, { name });
  }
  public deleteGitQuestion(): Observable<IGit> {
    return this.http.delete<IGit>(`${this._gitUrl}/3`);
  }
  public deleteCategory(id: string): Observable<ICategory> {
    return this.http.delete<ICategory>(`${this._categoriesUrl}/${id}`);
  }

  public patchGitQuestion(): Observable<IGit> {
    return this.http.patch<IGit>(`${this._gitUrl}/15`, this.mockObject2);
  }
}

//GET /point
//GET /point/:id
//POST /point
//PUT /point/:id
//PATCH /point/:id
//DELETE /point/:id
