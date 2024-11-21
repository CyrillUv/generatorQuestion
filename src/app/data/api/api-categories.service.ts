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
  private _categoriesUrl = 'http://localhost:3000/categories';

  constructor(private http: HttpClient) {}
  public getAllCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this._categoriesUrl}`);
  }
  public postCategory(category: ICategory): Observable<ICategory> {
    return this.http.post<ICategory>(`${this._categoriesUrl}`, category);
  }
  public patchCategory(id: string, name: string) {
    return this.http.patch<ICategory>(`${this._categoriesUrl}/${id}`, { name });
  }

  public deleteCategory(id: string): Observable<ICategory> {
    return this.http.delete<ICategory>(`${this._categoriesUrl}/${id}`);
  }
}
