import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiGitService, ICategory } from '../../../data/api/api-git.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { tap } from 'rxjs';
import { IQuestionDB } from '../../../data/question/type';

@Component({
  selector: 'app-document-categories',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './document-categories.component.html',
})
export class DocumentCategoriesComponent implements OnInit {
  @Input({ required: true }) public questions!: IQuestionDB[];
  @Output() loadingEmitter = new EventEmitter<boolean>();
  @Output() currentCategoryEmitter = new EventEmitter<string>();
  public currentCategory!: string;
  public newCategory = '';
  public adminMode = false;
  public categories!: ICategory[];

  constructor(private apiService: ApiGitService) {}

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
    this.apiService.getQuestionsCurrentCategory(endpoint).subscribe((res) => {
      this.questions = res;
      this.currentCategory = endpoint;
      this.currentCategoryEmitter.emit(endpoint);
      console.log(this.currentCategory);
    });
  }
}
