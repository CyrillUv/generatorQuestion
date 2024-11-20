import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IQuestionDB } from '../../../data/question/type';
import { SidebarComponent } from '../../custom/sidebar/sidebar.component';
import { NgIf } from '@angular/common';

import { ApiGitService } from '../../../data/api/api-git.service';
import { ModalComponent } from '../../custom/modal/modal.component';
import {
  ToastComponent,
  ToastStatus,
} from '../../custom/toast/toast.component';
import { ToastService } from '../../custom/toast/toast.service';
import { LoaderService } from '../../custom/loader/loader.service';

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
})
export class CategoryQuestionsComponent implements OnInit {
  @Input({ required: true }) public currentCategory!: string;
  @Input({ required: true }) public localStorageAPI = false;
  public deletedQuestion: boolean = false;
  public questions!: IQuestionDB[];
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

  constructor(
    private apiService: ApiGitService,
    private toastService: ToastService,
    private loader: LoaderService,
  ) {}

  public ngOnInit(): void {
    this.getQuestionsCurrentCategory(this.currentCategory);
  }

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
    this.loader
      .loading(this.apiService.getQuestionsCurrentCategory(endpoint))
      .subscribe((res) => {
        this.questions = res;
        this.currentCategory = endpoint;
      });
  }

  public addQuestion(
    title: string,
    response: string,
    level: 'Junior' | 'Middle' | 'Senior',
  ): void {
    if (this.questions.some((el) => el.title === title)) {
      this.toastService.openToast({
        title: 'Предупреждение',
        description: 'Этот вопрос уже существует',
        type: ToastStatus.warning,
      });
    }
    //Нужно обработать валидатором этот кэйс
    if (title && response && !this.questions.some((el) => el.title === title)) {
      this.loader
        .loading(
          this.apiService.postQuestion(
            this.currentCategory,
            title,
            response,
            level,
          ),
        )
        .subscribe(
          () => {
            this.closeSidebar();
            this.creatingQuestion = false;
            this.toastService.openToast({
              title: 'Успех',
              description: 'Добавление вопроса прошло успешно!',
            });

            // this.questions.push();
            this.setDefaultValueCurrentQuestion();
            this.getQuestionsCurrentCategory(this.currentCategory);
          },
          (error) => {
            console.log(error);
            this.toastService.openToast({
              title: 'Ошибка',
              description: error.error,
              type: ToastStatus.error,
            });
          },
        );
    }
  }

  public setDefaultValueCurrentQuestion(): void {
    this.currentQuestion = {
      title: '',
      response: '',
      level: 'Junior',
      active: false,
    };
  }

  public changeQuestion(question: IQuestionDB) {
    this.currentQuestion = question;
    this.changingQuestion = true;
  }

  public editQuestion(): void {
    this.loader
      .loading(
        this.apiService.patchQuestion(
          this.currentCategory + '/' + this.currentQuestion.id,
          this.currentQuestion,
        ),
      )
      .subscribe(
        () => {
          this.getQuestionsCurrentCategory(this.currentCategory);
          this.closeSidebar();
          this.toastService.openToast({
            title: 'Успех',
            description: 'Изменение прошло успешно!',
          });
        },
        (error) => {
          this.toastService.openToast({
            title: 'Ошибка',
            description: error.error,
            type: ToastStatus.error,
          });
        },
      );
  }

  public approveDelete() {
    if (this.currentQuestion.id) {
      this.loader
        .loading(
          this.apiService.deleteQuestion(
            this.currentCategory + '/' + this.currentQuestion.id,
          ),
        )
        .subscribe(
          () => {
            this.toastService.openToast({
              title: 'Успех',
              description: 'Удаление вопроса прошло успешно!',
            });
            this.getQuestionsCurrentCategory(this.currentCategory);
          },
          (error) => {
            this.toastService.openToast({
              title: 'Ошибка',
              description: error.error,
              type: ToastStatus.error,
            });
          },
        );
    }
  }

  public cancelDelete() {
    this.deletedQuestion = false;
  }

  public deleteQuestion(question: any, state: boolean) {
    this.currentQuestion = question;
    this.deletedQuestion = true;
  }
}
