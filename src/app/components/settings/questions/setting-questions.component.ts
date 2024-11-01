import { RouterLink } from '@angular/router';

import { Component, inject } from '@angular/core';

import { NgForOf, NgIf } from '@angular/common';
import { ToggleComponent } from '../../custom/toggle/toggle.component';
import { SidebarComponent } from '../../custom/sidebar/sidebar.component';
import { ModalComponent } from '../../custom/modal/modal.component';
import { MenuService } from '../../../data/menu/menu.service';
import { QuestionService } from '../../../data/question/question.service';
import { IDataMenu, IOptions } from '../../../data/menu/data-menu';
import { MultiSelectComponent } from '../../custom/multi-select/multi-select.component';
import { SelectComponent } from '../../custom/select/select.component';
import { NameDataType } from '../../../data/question/type';

@Component({
  selector: 'app-setting-questions',
  templateUrl: 'setting-questions.component.html',
  styleUrl: '../settings.component.scss',
  standalone: true,
  imports: [
    RouterLink,
    ToggleComponent,
    NgForOf,
    NgIf,
    SidebarComponent,
    ModalComponent,
    MultiSelectComponent,
    SelectComponent,
  ],
})
export class SettingsQuestionsComponent {
  //значение тогла
  public valueToggle!: boolean | null;
  //массив данных настроек
  public dataMenu!: IDataMenu[];
  //текущее количество вопросов
  public currentNumOfQuestions = '20 вопросов';
  //Иньекция меню сервиса
  public ms = inject(MenuService);
  //Иньекция сервиса вопросов
  public qs = inject(QuestionService);
  constructor() {
    //получение количества вопросов
    this.currentNumOfQuestions =
      this.ms.getCurrentNumOfQuestions() + ' вопросов';
    //присваивание данных настроек в локальную переменную
    this.dataMenu = this.ms.getData();
    //получение состояния тогла
    this.valueToggle = this.ms.getValueToggle();
  }
  //изменение состояния тогла
  public changeToggle(toggle: boolean): void {
    //обнуление состояния тогла
    this.valueToggle = null;
    //изменение состояния тогла глобально
    this.ms.setValueToggle(toggle);
    //открытие/закрытие модалки
    this.ms.setActiveModal(toggle);
  }
  //изменение количества вопросов
  public changeNumOfQuestions(numOfQuestions: string): void {
    //задание текущего количества вопросов локально
    this.currentNumOfQuestions = numOfQuestions.split(' ')[0];
    //задание текущего количества вопросов глобально
    this.ms.setCurrentNumOfQuestions(+this.currentNumOfQuestions);
  }
  public selectionCategory(categories: IOptions[]): void {
    this.qs.setActualCategories(categories);
  }
  public selectionLevels(levels: IOptions[]): void {
    this.qs.setActualLevels(levels);
  }
}
