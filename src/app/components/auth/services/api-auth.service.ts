import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";

export interface IUser {
  login: string;
  password: string;
  secretWord: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiAuthService {
  //эндпоинт на массив пользователей
  private _usersUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}
  //получение всех пользователей
  public getAllUsers(): Observable<IUser[]> {
   return  this.http.get<IUser[]>(`${this._usersUrl}`)
  }
  //получение пользователя
  public getUser(id:string):Observable<IUser>{
    return this.http.get<IUser>(`${this._usersUrl}/${id}`);
  }
  //добавление пользователя
  public postUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this._usersUrl}`, user);
  }
  //изменение пароля
  public patchUser(id: string,password:string): Observable<IUser> {
    return this.http.patch<IUser>(`${this._usersUrl}/${id}`, {password});
  }
  //удаление пользователя
  public deleteUser(id: string): Observable<IUser> {
    return this.http.delete<IUser>(`${this._usersUrl}/${id}`);
  }
}
