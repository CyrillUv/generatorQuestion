import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ICategory {
  id: string;
  name: string;
  endpoint: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiCategoriesService {
  //поинт категорий
  private _categoriesUrl = 'http://localhost:3000/categories';

  constructor(private http: HttpClient) {}
  //получение всех категорий
  public getAllCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this._categoriesUrl}`);
  }
  //добавление категории
  public postCategory(category: ICategory): Observable<ICategory> {
    return this.http.post<ICategory>(`${this._categoriesUrl}`, category);
  }
  //изменение категории
  public patchCategory(id: string, name: string) {
    return this.http.patch<ICategory>(`${this._categoriesUrl}/${id}`, { name });
  }
  //удаление категории
  public deleteCategory(id: string): Observable<ICategory> {
    return this.http.delete<ICategory>(`${this._categoriesUrl}/${id}`);
  }
}
