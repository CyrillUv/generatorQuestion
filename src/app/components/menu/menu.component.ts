import { Component, Inject, ViewContainerRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { CURRENT_USER_TOKEN$, MenuService, QuestionService } from '../../data';
import { SidebarModule } from '../settings/sidebar.module';
import {
  SettingsQuestionsComponent,
  SettingTestingComponent,
} from '../settings';
import {
  LoaderComponent,
  ModalComponent,
  MultiSelectComponent,
  MyFormComponent,
  ToastComponent,
} from '../custom';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../auth';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    NgIf,
    NgForOf,
    SidebarModule,
    SettingsQuestionsComponent,
    SettingTestingComponent,
    ModalComponent,
    MultiSelectComponent,
    MyFormComponent,
    ToastComponent,
    LoaderComponent,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  //Флаг для отображения модального окна
  public activeModal!: boolean;
  public loading = true;
  //Константный обьект содержащий компоненты ключ(направление пути),значение(компонент)
  private readonly routeInComponent: {
    '/questions': typeof SettingsQuestionsComponent;
    '/testing': typeof SettingTestingComponent;
  } = {
    '/questions': SettingsQuestionsComponent,
    '/testing': SettingTestingComponent,
  };

  constructor(
    public ms: MenuService,
    private _qs: QuestionService,
    private _vcr: ViewContainerRef,
    @Inject(CURRENT_USER_TOKEN$) public userToken$: BehaviorSubject<IUser>,
  ) {
    //Задание значения отображению модалки
    this.activeModal = this.ms.getActiveModal();
    this.userToken$.subscribe((res) => {
    });
  }

  //Изменяет путь
  public changeRoute(route: '/questions' | '/testing') {
    //изменяет путь в сервисе
    this.ms.setRoute(route);
    //активирует режим настроек
    this.ms.setSettingMode(true);
    //предотвращение накладывания сайдбаров
    this._vcr.clear();
    // @ts-ignore
    //создание компонента
    this._vcr.createComponent(this.routeInComponent[route]);
  }

  //Закрытие модалки
  public closeModal(): void {
    //Удаляет модалку с поля зрения
    this.ms.setActiveModal(false);
    //Возвращает положение тогла в начальное положение
    this.ms.setValueToggle(false);
  }

  //Позволяет обнулить все данные и начать заново работу программы
  public startAgain(): void {
    //Обнуление массива неотвеченных вопросов
    this._qs.nullingActualQuestions();
    //Обнуление массива отвеченных вопросов
    this.ms.nullingPassedQuestions();
    //Закрытие модалки
    this.closeModal();
  }
}
