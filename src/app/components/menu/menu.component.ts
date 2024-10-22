import { Component, ViewContainerRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';

import { MenuService } from '../../data/menu/menu.service';
import { SidebarModule } from '../settings/sidebar.module';
import { SettingsQuestionsComponent } from '../settings/questions/setting-questions.component';
import { SettingTestingComponent } from '../settings/testing/setting-testing.component';
import { ModalComponent } from '../custom/modal/modal.component';
import { QuestionService } from '../../data/question/question.service';

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
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  //Флаг для отображения модального окна
  public activeModal!: boolean;
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
    private qs: QuestionService,
    private vcr: ViewContainerRef,
  ) {
    //Задание значения отображению модалки
    this.activeModal = this.ms.getActiveModal();
  }
  //Изменяет путь
  public changeRoute(route: '/questions' | '/testing') {
    //изменяет путь в сервисе
    this.ms.setRoute(route);
    //активирует режим настроек
    this.ms.setSettingMode(true);
    //предотвращение накладывания сайдбаров
    this.vcr.clear();
    // @ts-ignore
    //создание компонента
    this.vcr.createComponent(this.routeInComponent[route]);
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
    this.qs.nullingActualQuestions();
    //Обнуление массива отвеченных вопросов
    this.ms.nullingPassedQuestions();
    //Закрытие модалки
    this.closeModal();
  }
}
