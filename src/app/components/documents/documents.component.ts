import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IQuestion } from '../../data/question/type';
import { SidebarComponent } from '../custom/sidebar/sidebar.component';
import { CategoryQuestionsComponent } from './category-questions/category-questions.component';
import { DocumentCategoriesComponent } from './document-categories/document-categories.component';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    RouterOutlet,
    FormsModule,
    NgForOf,
    SidebarComponent,
    CategoryQuestionsComponent,
    DocumentCategoriesComponent,
  ],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
})
export class DocumentsComponent {
  public questions!: IQuestion[];
  public currentCategory!: string;

  public setQuestions(questions: IQuestion[]): void {
    this.questions = questions;
    console.log(this.questions);
  }

  public setCurrentCategory(category: string): void {
    this.currentCategory = category;
    console.log(this.currentCategory);
  }

  // Функция для изменения высоты
  //Массив категорий
  //   public categories!: NameDataType[];
  //   //Массив вопросов
  //   public questions!: IQuestion[];
  //
  //   // constructor(private dataService: QuestionService) {}
  //   constructor(
  //     private dataService: QuestionService,
  //     private apiGitService: ApiGitService,
  //   ) {}
  //
  //   ngOnInit(): void {
  //     //Получение категорий из сервиса
  //     this.categories = this.dataService.getCategories();
  //   }
  //
  //   public getQuestions(category: NameDataType): void {
  //     // Получение вопросов выбранной категории
  //     this.questions = this.dataService.getDocuments(category);
  //   }
}
