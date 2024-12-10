import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";

export interface IUser {
  id?:string
  login: string;
  password?: string;
  secretWord?: string;
  systemAdmin?:boolean;
  systemUser?:boolean;
  image?:string
}

@Injectable({
  providedIn: 'root',
})
export class ApiAuthService {
  //эндпоинт на массив пользователей
  private _usersUrl = 'http://localhost:3000/users';
  //эндпоинт текущего юзера
  private _currentUserUrl = 'http://localhost:3000/current-user';
  constructor(private http: HttpClient) {}
  //получение всех пользователей
  public getAllUsers(): Observable<IUser[]> {
   return  this.http.get<IUser[]>(`${this._usersUrl}`)
  }
  //получение пользователя
  public getUser(id:string):Observable<IUser>{
    return this.http.get<IUser>(`${this._usersUrl}/${id}`);
  }
  public getCurrentUser():Observable<IUser[]>{
    return this.http.get<IUser[]>(`${this._currentUserUrl}`);
  }
  //добавление текущего пользователя
  public postCurrentUser(user:IUser):Observable<IUser>{
    return this.http.post<IUser>(`${this._currentUserUrl}`,{...user,systemAdmin:false,systemUser:false,image:''});
  }
  //добавление пользователя
  public postUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this._usersUrl}`, user);
  }
  //изменение пароля
  public patchUser(id: string,password:string): Observable<IUser> {
    return this.http.patch<IUser>(`${this._usersUrl}/${id}`, {password:password});
  }
  //удаление пользователя
  public deleteUser(id: string): Observable<IUser> {
    return this.http.delete<IUser>(`${this._usersUrl}/${id}`);
  }
  //удаление текущего пользователя
  public deleteCurrentUser(id:string): Observable<IUser> {
    return this.http.delete<IUser>(`${this._currentUserUrl}/${id}`);
  }
}