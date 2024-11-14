import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IQuestionDB } from '../../../data/question/type';
import { tap } from 'rxjs';
import { SidebarComponent } from '../../custom/sidebar/sidebar.component';
import { NgIf } from '@angular/common';

import { ApiGitService } from '../../../data/api/api-git.service';
import { ModalComponent } from '../../custom/modal/modal.component';
import { ToastComponent } from '../../custom/toast/toast.component';

@Component({
  selector: 'app-category-questions',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    SidebarComponent,
    FormsModule,
    NgIf,
    ModalComponent,
    ToastComponent,
  ],
  templateUrl: './category-questions.component.html',
  styleUrl: '../documents.component.scss',
})
export class CategoryQuestionsComponent implements OnChanges, OnInit {
  @Input({ required: true }) public currentCategory!: string;
  @Input() deletedQuestion!: boolean;
  @Output() loadingEmitter = new EventEmitter<boolean>();

  @Output() public questionsEmitter = new EventEmitter<IQuestionDB[]>();
  @Output() public deletedQuestionEmitter = new EventEmitter<boolean>();
  public questions!: IQuestionDB[];
  public toastData = { title: '', description: '', active: false };
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
  public heightTextarea = 'auto';

  ngOnInit() {
    if (this.currentCategory) {
      this.getQuestionsCurrentCategory(this.currentCategory);
    }
  }

  ngOnChanges() {
    if (this.currentCategory) {
      this.getQuestionsCurrentCategory(this.currentCategory);
    }
  }
  constructor(private apiService: ApiGitService) {}

  public autoResize(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    if (textarea.scrollHeight > textarea.clientHeight) {
      this.heightTextarea = textarea.scrollHeight + 'px';
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
  public getQuestionsCurrentCategory(endpoint: string): void {
    this.apiService.getQuestionsCurrentCategory(endpoint).subscribe((res) => {
      this.questions = res;
      this.questionsEmitter.emit(res);
      this.currentCategory = endpoint;
      console.log(this.questions);
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
  public addQuestion(
    title: string,
    response: string,
    level: 'Junior' | 'Middle' | 'Senior',
  ): void {
    console.log(this.questions);
    //Нужно обработать валидатором этот кэйс
    if (title && response && !this.questions.some((el) => el.title === title)) {
      this.loadingEmitter.emit(true);

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
      this.toastData.active = true;
      this.toastData.title = 'Успех';
      this.toastData.description = 'Добавление нового вопроса прошло успешно!';
    }
  }

  public changeQuestion(nameQuestion: string) {
    this.getQuestionCurrentCategory(this.currentCategory, nameQuestion);
    this.changingQuestion = true;
  }
  public editQuestion(): void {
    if (this.currentQuestion.title && this.currentQuestion.response) {
      this.loadingEmitter.emit(true);
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
      this.toastData.active = true;
      this.toastData.title = 'Успех';
      this.toastData.description = 'Изменение вопроса прошло успешно!';
      console.log(this.currentQuestion);
    }
  }
  public removeQuestion() {
    if (this.currentQuestion.id) {
      this.loadingEmitter.emit(true);
      this.apiService
        .deleteQuestion(this.currentCategory + '/' + this.currentQuestion.id)
        .pipe(
          tap((n) => this.getQuestionsCurrentCategory(this.currentCategory)),
        )
        .subscribe((res) => res);
      this.deletedQuestionEmitter.emit(false);
      this.toastData.active = true;
    }
    this.toastData.title = 'Успех';
    this.toastData.description = 'Удаление вопроса прошло успешно!';
  }
  public deletingQuestion(nameQuestion: string, state: boolean) {
    this.deletedQuestionEmitter.emit(state);
    this.getQuestionCurrentCategory(this.currentCategory, nameQuestion);
  }
  public toastHandler(state: boolean) {
    this.toastData.active = state;
  }
}
