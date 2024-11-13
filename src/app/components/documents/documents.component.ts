import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';

import { ApiGitService, ICategory } from '../../data/api/api-git.service';
import { FormsModule } from '@angular/forms';
import { tap } from 'rxjs';
import { IQuestion, IQuestionDB } from '../../data/question/type';
import { SidebarComponent } from '../custom/sidebar/sidebar.component';

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
  ],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
})
export class DocumentsComponent implements OnInit {
  public categories!: ICategory[];
  public questions!: IQuestion[];
  public newCategory = '';
  public adminMode = false;
  public creatingQuestion = false;
  public changingQuestion = false;
  public currentQuestion: IQuestionDB = {
    title: '',
    response: '',
    level: 'Junior',
    active: false,
  };
  public newQuestion: IQuestionDB = {
    title: '',
    response: '',
    level: 'Junior',
    active: false,
  };
  public currentCategory!: string;
  public heightTextarea = 'auto';
  public autoResize(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    if (textarea.scrollHeight > textarea.clientHeight) {
      this.heightTextarea = textarea.scrollHeight + 'px';
    }
  }

  // Функция для изменения высоты

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
      .pipe(tap((n) => this.getAllCategories()))
      .subscribe();
  }

  public changeCategory(id: string, name: string): void {
    if (this.newCategory)
      this.apiService
        .patchCategory(id, name)
        .pipe(tap((n) => this.getAllCategories()))
        .subscribe();
  }

  public addCategory() {
    if (
      this.newCategory &&
      !this.categories.some((el) => el.name === this.newCategory) &&
      this.newQuestion.level &&
      this.newQuestion.title &&
      this.newQuestion.response
    )
      this.apiService
        .postCategory({
          id: String(this.categories.length),
          name: this.newCategory,
          endpoint: this.newCategory,
        })
        .pipe(
          tap((n) => {
            console.log(n);
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
    });
  }
  public getQuestionCurrentCategory(
    endpoint: string,
    nameQuestion: string,
  ): void {
    this.apiService.getQuestionsCurrentCategory(endpoint).subscribe((res) => {
      this.currentQuestion = res.find(
        (el) => el.title === nameQuestion,
      ) as IQuestionDB;
    });
  }
  public changeQuestion(nameQuestion: string) {
    this.getQuestionCurrentCategory(this.currentCategory, nameQuestion);
    this.changingQuestion = true;
  }
  public editQuestion(): void {
    if (this.currentQuestion.title && this.currentQuestion.response) {
      this.apiService
        .patchQuestion(
          this.currentCategory + '/' + this.currentQuestion.id,
          this.currentQuestion,
        )
        .pipe(
          tap((n) => this.getQuestionsCurrentCategory(this.currentCategory)),
        )
        .subscribe((res) => res);
      this.closeSidebar();
      console.log(this.currentQuestion);
    }
  }
  public addQuestion(
    title: string,
    response: string,
    level: 'Junior' | 'Middle' | 'Senior',
  ): void {
    //Нужно обработать валидатором этот кэйс
    if (title && response && !this.questions.some((el) => el.title === title)) {
      this.apiService
        .postQuestion(this.currentCategory, title, response, level)
        .pipe(
          tap((n) => {
            this.getQuestionsCurrentCategory(this.currentCategory);
            console.log(n);
          }),
        )
        .subscribe();
      this.creatingQuestion = false;
      this.closeSidebar();
    }
  }
  public closeSidebar() {
    if (this.creatingQuestion) this.creatingQuestion = false;
    if (this.changingQuestion) this.changingQuestion = false;
    this.newQuestion = {
      title: '',
      response: '',
      level: 'Junior',
      active: false,
    };
    this.heightTextarea = 'auto';
  }
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
