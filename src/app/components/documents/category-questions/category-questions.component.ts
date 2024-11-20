import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
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
export class CategoryQuestionsComponent implements OnChanges {
  @Input({ required: true }) public currentCategory!: string;
  @Input() deletedQuestion!: boolean;
  @Output() public questionsEmitter = new EventEmitter<IQuestionDB[]>();
  @Output() public deletedQuestionEmitter = new EventEmitter<boolean>();
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

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['deletedQuestion'])
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
        this.questionsEmitter.emit(res);
        this.currentCategory = endpoint;
      });
  }

  public getCurrentQuestionCurrentCategory(
    endpoint: string,
    nameQuestion: string,
  ): void {
    this.apiService.getQuestionsCurrentCategory(endpoint).subscribe((res) => {
      this.currentQuestion = res.find(
        (el: IQuestionDB) => el.title === nameQuestion,
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
            this.creatingQuestion = false;
            this.closeSidebar();
            this.toastService.openToast({
              title: 'Успех',
              description: 'Добавление вопроса прошло успешно!',
            });
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

  public changeQuestion(nameQuestion: string) {
    this.getCurrentQuestionCurrentCategory(this.currentCategory, nameQuestion);
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

  public removeQuestion() {
    if (this.currentQuestion.id) {
      this.loader
        .loading(
          this.apiService.deleteQuestion(
            this.currentCategory + '/' + this.currentQuestion.id,
          ),
        )
        .subscribe(
          () => {
            this.deletedQuestionEmitter.emit(false);
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

  public deletingQuestion(nameQuestion: string, state: boolean) {
    this.deletedQuestionEmitter.emit(state);
    this.getCurrentQuestionCurrentCategory(this.currentCategory, nameQuestion);
  }
}
