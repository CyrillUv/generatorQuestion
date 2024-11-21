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
  @Output() loadingEmitter = new EventEmitter<boolean>();
  @Output() currentCategoryEmitter = new EventEmitter<string>();
  public newCategory = '';
  public adminMode = false;
  public categories!: ICategory[];

  constructor(private apiService: ApiCategoriesService) {}

  ngOnInit() {
    this.getAllCategories();
  }

  public getAllCategories(): void {
    this.apiService.getAllCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  public removeCategory(id: string) {
    this.apiService
      .deleteCategory(id)
      .pipe(tap(() => this.getAllCategories()))
      .subscribe();
  }

  public changeCategory(id: string, name: string): void {
    if (this.newCategory)
      this.apiService
        .patchCategory(id, name)
        .pipe(tap(() => this.getAllCategories()))
        .subscribe();
  }

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

  public getQuestionsCurrentCategory(endpoint: string): void {
    this.currentCategoryEmitter.emit(endpoint);
  }
}
