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
  //получение текстариа
  @ViewChild('textarea') textarea!: ElementRef<HTMLTextAreaElement>;
  //сеттер для получения текущей категории и вопросов категории
  @Input({ required: true })
  public set setCurrentCategory(value: string) {
    if (!value) return;
    if (this.currentCategory !== value) {
      this.currentCategory = value;
      this.getQuestionsCurrentCategory(this.currentCategory);
    }
  }

  //механика для предотвращения лишних запросов для манипуляций с вопросами
  @Input({ required: true }) public localStorageAPI = false;
  //отвечает за появление модалки при удалении
  public deletedQuestion = false;
  //массив вопросов данной категории
  public questions!: IQuestionDB[];
  //режим сайдбара для создания вопросов
  public creatingQuestion = false;
  // режим сайдбара для изменения вопросов
  public changingQuestion = false;
  //текущая категория
  public currentCategory!: string;
  //переменная для изменения данных связанных с выбранным вопросом
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
    //получение вопросов данной категории
    this.getQuestionsCurrentCategory(this.currentCategory);
  }
  //регулирование высоты текстариа
  public onInput(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto'; // Сбрасываем высоту
    textarea.style.height = textarea.scrollHeight + 'px'; // Устанавливаем высоту под текст
  }
  //закрытие сайдбара
  public closeSidebar() {
    if (this.creatingQuestion) this.creatingQuestion = false;
    if (this.changingQuestion) this.changingQuestion = false;
  }
  //получение вопросов данной категории
  public getQuestionsCurrentCategory(endpoint: string): void {
    //кэширование запросов при выборе категорий вопросов
    const existKey = this.apiService.existKeyInCache(endpoint);
    //загрузка и получение вопросов
    this.loader
      .loading(this.apiService.getQuestionsCurrentCategory(endpoint), !existKey)
      .subscribe((res) => {
        this.questions = res;
        this.currentCategory = endpoint;
      });
  }
  //добавление вопроса
  public addQuestion(
    title: string,
    response: string,
    level: 'Junior' | 'Middle' | 'Senior',
  ): void {
    //если такое название вопроса есть, выскакивает предупреждение
    if (this.questions.some((el) => el.title === title)) {
      this.toastService.openToast({
        title: 'Предупреждение',
        description: 'Этот вопрос уже существует',
        type: ToastStatus.warning,
      });
    }
    //todo Нужно обработать валидатором этот кэйс
    //если тайтл и ответ есть и такого названия вопроса не существует
    if (
      title.trim() &&
      response.trim() &&
      !this.questions.some((el) => el.title === title)
    ) {
      //добавляем вопрос в бд
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
            //закрываем сайдбар и выкатывает тост
            this.closeSidebar();
            this.creatingQuestion = false;
            this.toastService.openToast({
              title: 'Успех',
              description: 'Добавление вопроса прошло успешно!',
              type: ToastStatus.success,
            });
            //создание нового вопроса
            const newQuestion = {
              id: res.id,
              title: this.currentQuestion.title,
              level: this.currentQuestion.level,
              active: false,
              response: this.currentQuestion.response,
            };
            //добавление без лишнего запроса
            if (this.localStorageAPI) {
              this.questions.push(newQuestion);
            } else {
              //добавление с кэшированием,но с запросом
              this.apiService.setCache(
                this.currentCategory,
                'add',
                newQuestion,
              );
              this.getQuestionsCurrentCategory(this.currentCategory);
            }
          },
          (error) => {
            //тост ошибки
            this.toastService.openToast({
              title: 'Ошибка',
              description: error.error,
              type: ToastStatus.error,
            });
          },
        );
    } else {
      //тост напоминалка
      this.toastService.openToast({
        title: 'Напоминание',
        description: 'Поля должны быть заполнены!',
        type: ToastStatus.info,
      });
    }
  }
  //сайдбар изменения
  public changeQuestion(question: IQuestionDB) {
    this.currentQuestion = question;
    this.changingQuestion = true;
  }
  //изменение выбранного вопроса
  public editQuestion(): void {
    //если поля заполнены
    if (
      this.currentQuestion.title.trim().length &&
      this.currentQuestion.response.trim().length
    ) {
      //загружаем и отправляем запрос изменения вопроса
      this.loader
        .loading(
          this.apiService.patchQuestion(
            this.currentCategory + '/' + this.currentQuestion.id,
            this.currentQuestion,
          ),
        )
        .subscribe(
          () => {
            //без лишнего запроса
            if (this.localStorageAPI) {
              this.questions = this.questions.map((el) => {
                return el.id === this.currentQuestion.id
                  ? { ...el, ...this.currentQuestion }
                  : el;
              });
            }
            //с запросом для изменения данных
            else {
              this.getQuestionsCurrentCategory(this.currentCategory);
            }
            //закрытие сайдбара и выпадание успешного тоста
            this.closeSidebar();
            this.toastService.openToast({
              title: 'Успех',
              description: 'Изменение прошло успешно!',
              type: ToastStatus.success,
            });
          },
          (error) => {
            //тост ошибки
            this.toastService.openToast({
              title: 'Ошибка',
              description: error.error,
              type: ToastStatus.error,
            });
          },
        );
    } else {
      //напоминалка
      this.toastService.openToast({
        title: 'Напоминание',
        description: 'Поля должны быть заполнены!',
        type: ToastStatus.info,
      });
    }
  }

  //удаление вопроса
  public approveDelete() {
    //загрузка и отправка запроса на удаление
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
          //удаление через фронт
          if (this.localStorageAPI) {
            this.questions = this.questions.filter(
              (el) => el.id !== this.currentQuestion.id,
            );
          }
          // удаление с кэшированием и запросом
          else {
            this.apiService.setCache(
              this.currentCategory,
              'delete',
              <string>this.currentQuestion.id,
            );
            this.getQuestionsCurrentCategory(this.currentCategory);
          }
        },
        (error) => {
          //тост ошибки
          this.toastService.openToast({
            title: 'Ошибка',
            description: error.error,
            type: ToastStatus.error,
          });
        },
      );
  }
  //выход в модалке
  public cancelDelete() {
    this.deletedQuestion = false;
  }
  //вызов модалки удаления
  public deleteQuestion(question: IQuestionDB) {
    this.currentQuestion = question;
    this.deletedQuestion = true;
  }
  //сайдбар создания вопроса
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
