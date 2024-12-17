import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProfile } from '../../auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiProfileService {
  public profileUrl = 'http://localhost:3000/profile';

  constructor(private http: HttpClient) {}

  public getProfile(): Observable<IProfile[]>{
    return this.http.get<IProfile[]>(`${this.profileUrl}`)
  }
  public setProfileInCurrentUser(body: IProfile): Observable<IProfile> {
    return this.http.post<IProfile>(`${this.profileUrl}`, body);
  }
}
