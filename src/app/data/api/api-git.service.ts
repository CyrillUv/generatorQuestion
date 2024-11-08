import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface IGit {
  id: string;
  name: string;
  age: number;
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
  private _baseUrl = 'http://localhost:3000/git';
  constructor(public http: HttpClient) {}

  public getAllGitQuestions(): Observable<IGit[]> {
    return this.http.get<IGit[]>(`${this._baseUrl}`);
  }
  public getGitQuestion(): Observable<IGit> {
    return this.http.get<IGit>(`${this._baseUrl}/10`);
  }
  public postGitQuestion(): Observable<IGit> {
    return this.http.post<IGit>(`${this._baseUrl}`, this.mockObject);
  }
  public putGitQuestion(): Observable<IGit> {
    return this.http.put<IGit>(`${this._baseUrl}/5`, this.mockObject2);
  }
  public deleteGitQuestion(): Observable<IGit> {
    return this.http.delete<IGit>(`${this._baseUrl}/3`);
  }
  public patchGitQuestion(): Observable<IGit> {
    return this.http.patch<IGit>(`${this._baseUrl}/15`, this.mockObject2);
  }
}

//GET /point
//GET /point/:id
//POST /point
//PUT /point/:id
//PATCH /point/:id
//DELETE /point/:id
