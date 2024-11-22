import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { tap } from 'rxjs';
import {
  ApiCategoriesService,
  ICategory,
} from '../../../data/api/api-categories.service';

@Component({
  selector: 'app-document-categories',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './document-categories.component.html',
})
export class DocumentCategoriesComponent implements OnInit {
  //эмит текущей категории
  @Output() currentCategoryEmitter = new EventEmitter<string>();
  //новая категория
  public newCategory = '';
  //режим бога
  public adminMode = false;
  //категории документации
  public categories!: ICategory[];
  constructor(private apiService: ApiCategoriesService) {}

  ngOnInit() {
    //получение всех категорий
    this.getAllCategories();
  }

  public getAllCategories(): void {
    //запрос на все категории
    this.apiService.getAllCategories().subscribe((res) => {
      this.categories = res;
    });
  }
  //удаление категории
  public removeCategory(id: string) {
    this.apiService
      .deleteCategory(id)
      .pipe(tap(() => this.getAllCategories()))
      .subscribe();
  }
  //изменение категории
  public changeCategory(id: string, name: string): void {
    if (this.newCategory)
      this.apiService
        .patchCategory(id, name)
        .pipe(tap(() => this.getAllCategories()))
        .subscribe();
  }
  //добавление категории
  public addCategory() {
    if (
      this.newCategory &&
      !this.categories.some((el) => el.name === this.newCategory)
    )
      this.apiService
        .postCategory({
          id: String(this.categories.length),
          name: this.newCategory,
          endpoint: this.newCategory,
        })
        .pipe(
          tap(() => {
            this.getAllCategories();
          }),
        )
        .subscribe();
    this.newCategory = '';
  }
  //эмит на получение вопросов по выбранной категории
  public getQuestionsCurrentCategory(endpoint: string): void {
    this.currentCategoryEmitter.emit(endpoint);
  }
}
