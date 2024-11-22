import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IQuestionDB } from '../../../data/question/type';
import { SidebarComponent } from '../../custom/sidebar/sidebar.component';
import { NgIf } from '@angular/common';
import { ModalComponent } from '../../custom/modal/modal.component';
import {
  ToastComponent,
  ToastStatus,
} from '../../custom/toast/toast.component';
import { ToastService } from '../../custom/toast/toast.service';
import { LoaderService } from '../../custom/loader/loader.service';
import { ApiQuestionsService } from '../../../data/api/api-questions.service';

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
  @ViewChild('textarea') textarea!: ElementRef<HTMLTextAreaElement>;

  @Input({ required: true })
  public set setCurrentCategory(value: string) {
    if (!value) return;
    if (this.currentCategory !== value) {
      this.currentCategory = value;
      this.getQuestionsCurrentCategory(this.currentCategory);
    }
  }

  @Input({ required: true }) public localStorageAPI = false;
  public deletedQuestion = false;
  public questions!: IQuestionDB[];
  public creatingQuestion = false;
  public changingQuestion = false;
  public currentCategory!: string;
  public currentQuestion: IQuestionDB = {
    title: '',
    response: '',
    level: 'Junior',
    active: false,
  };

  constructor(
    private apiService: ApiQuestionsService,
    private toastService: ToastService,
    private loader: LoaderService,
  ) {}

  ngOnInit() {
    this.getQuestionsCurrentCategory(this.currentCategory);
  }

  public onInput(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto'; // Сбрасываем высоту
    textarea.style.height = textarea.scrollHeight + 'px'; // Устанавливаем высоту под текст
  }

  public closeSidebar() {
    if (this.creatingQuestion) this.creatingQuestion = false;
    if (this.changingQuestion) this.changingQuestion = false;
  }

  public getQuestionsCurrentCategory(endpoint: string): void {
    const existKey = this.apiService.existKeyInCache(endpoint);
    this.loader
      .loading(this.apiService.getQuestionsCurrentCategory(endpoint), !existKey)
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
    if (
      title.trim() &&
      response.trim() &&
      !this.questions.some((el) => el.title === title)
    ) {
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
          (res) => {
            this.closeSidebar();
            this.creatingQuestion = false;
            this.toastService.openToast({
              title: 'Успех',
              description: 'Добавление вопроса прошло успешно!',
              type: ToastStatus.success,
            });
            const newQuestion = {
              id: res.id,
              title: this.currentQuestion.title,
              level: this.currentQuestion.level,
              active: false,
              response: this.currentQuestion.response,
            };
            if (this.localStorageAPI) {
              this.questions.push(newQuestion);
            } else {
              this.apiService.setCache(
                this.currentCategory,
                'add',
                newQuestion,
              );
              this.getQuestionsCurrentCategory(this.currentCategory);
            }
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
    } else {
      this.toastService.openToast({
        title: 'Напоминание',
        description: 'Поля должны быть заполнены!',
        type: ToastStatus.info,
      });
    }
  }

  public changeQuestion(question: IQuestionDB) {
    this.currentQuestion = question;
    this.changingQuestion = true;
  }

  public editQuestion(): void {
    if (
      this.currentQuestion.title.trim().length &&
      this.currentQuestion.response.trim().length
    ) {
      this.loader
        .loading(
          this.apiService.patchQuestion(
            this.currentCategory + '/' + this.currentQuestion.id,
            this.currentQuestion,
          ),
        )
        .subscribe(
          () => {
            if (this.localStorageAPI) {
              this.questions = this.questions.map((el) => {
                return el.id === this.currentQuestion.id
                  ? { ...el, ...this.currentQuestion }
                  : el;
              });
            } else {
              console.log('222');
              this.getQuestionsCurrentCategory(this.currentCategory);
            }
            this.closeSidebar();
            this.toastService.openToast({
              title: 'Успех',
              description: 'Изменение прошло успешно!',
              type: ToastStatus.success,
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
    } else {
      this.toastService.openToast({
        title: 'Напоминание',
        description: 'Поля должны быть заполнены!',
        type: ToastStatus.info,
      });
    }
  }

  public approveDelete() {
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
            type: ToastStatus.success,
          });
          if (this.localStorageAPI) {
            this.questions = this.questions.filter(
              (el) => el.id !== this.currentQuestion.id,
            );
          } else {
            this.apiService.setCache(
              this.currentCategory,
              'delete',
              <string>this.currentQuestion.id,
            );
            this.getQuestionsCurrentCategory(this.currentCategory);
          }
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

  public cancelDelete() {
    this.deletedQuestion = false;
  }

  public deleteQuestion(question: IQuestionDB) {
    this.currentQuestion = question;
    this.deletedQuestion = true;
  }

  public createQuestion() {
    this.currentQuestion = {
      title: '',
      response: '',
      level: 'Junior',
      active: false,
    };
    this.creatingQuestion = true;
  }
}
