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
import { MultiSelectComponent } from '../custom/multi-select/multi-select.component';
import { MyFormComponent } from '../custom/my-form/my-form.component';
import { ApiGitService } from '../../data/api/api-git.service';

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
    private _qs: QuestionService,
    private _vcr: ViewContainerRef,
    private _apiService: ApiGitService,
  ) {
    //Задание значения отображению модалки
    this.activeModal = this.ms.getActiveModal();
  }
  public getAllGitQuestions(): void {
    this._apiService.getAllGitQuestions().subscribe((res) => {
      console.log(res);
    });
  }
  public getGitQuestions(): void {
    this._apiService.getGitQuestion().subscribe((res) => {
      console.log(res);
    });
  }
  public postGitQuestion(): void {
    this._apiService.postGitQuestion().subscribe((res) => {
      console.log(res);
    });
  }
  public putGitQuestion(): void {
    this._apiService.putGitQuestion().subscribe((res) => {
      console.log(res);
    });
  }
  public deleteGitQuestion(): void {
    this._apiService.deleteGitQuestion().subscribe((res) => {
      console.log(res);
    });
  }
  public patchGitQuestion(): void {
    this._apiService.patchGitQuestion().subscribe((res) => {
      console.log(res);
    });
  }
  //  public getGitQuestion(): Observable<IGit> {
  //     return this.http.get<IGit>(this._baseUrl+'/10');
  //   }
  //   public postGitQuestion():Observable<IGit> {
  //     return this.http.post<IGit>(this._baseUrl,this.mockObject)
  //   }
  //   public putGitQuestion():Observable<IGit> {
  //     return this.http.put<IGit>(this._baseUrl+'/5',this.mockObject)
  //   }
  //   public deleteGitQuestion():Observable<IGit> {
  //     return this.http.delete<IGit>(this._baseUrl+'/3');
  //   }
  //   public patchGitQuestion():Observable<IGit> {
  //     return this.http.patch<IGit>(this._baseUrl+'/15',this.mockObject)
  //   }
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
