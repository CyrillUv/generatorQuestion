import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
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
import { log } from '@angular-devkit/build-angular/src/builders/ssr-dev-server';

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
  public heightTextarea = 'auto';

  constructor(
    private apiService: ApiQuestionsService,
    private toastService: ToastService,
    private loader: LoaderService,
    private cdRef: ChangeDetectorRef,
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
              type: ToastStatus.success,
            });
            if (this.localStorageAPI) {
              this.questions.push({
                id: this.currentQuestion.id,
                title: this.currentQuestion.title,
                level: this.currentQuestion.level,
                active: false,
                response: this.currentQuestion.response,
              });
            } else {
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
    }
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
          if (this.localStorageAPI) {
            const current = this.questions.find(
              (el) => el.id === this.currentQuestion.id,
            );
            if (current || current === this.currentQuestion) {
              for (let value of Object.values(current)) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                value = Object.values(this.currentQuestion);
              }
            }
          } else {
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
          if (error.status === 404) {
            if (this.localStorageAPI) {
              const current = this.questions.find(
                (el) => el.id === this.currentQuestion.id,
              );
              if (current || current === this.currentQuestion) {
                for (let value of Object.values(current)) {
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  value = Object.values(this.currentQuestion);
                }
              }
            }
            this.closeSidebar();
            this.toastService.openToast({
              title: 'Успех',
              description: 'Изменение прошло успешно!',
              type: ToastStatus.success,
            });
          }
        },
      );
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
            this.getQuestionsCurrentCategory(this.currentCategory);
          }
        },
        (error) => {
          this.toastService.openToast({
            title: 'Ошибка',
            description: error.error,
            type: ToastStatus.error,
          });
          if (error.status === 404) {
            if (this.localStorageAPI) {
              this.questions = this.questions.filter(
                (el) => el.id !== this.currentQuestion.id,
              );
            }
            this.toastService.openToast({
              title: 'Успех',
              description: 'Удаление вопроса прошло успешно!',
              type: ToastStatus.success,
            });
          }
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
