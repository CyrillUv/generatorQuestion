import { RouterLink } from '@angular/router';

import { Component, inject } from '@angular/core';

import { NgForOf, NgIf } from '@angular/common';
import { ToggleComponent } from '../../custom/toggle/toggle.component';
import { SidebarComponent } from '../../custom/sidebar/sidebar.component';
import { ModalComponent } from '../../custom/modal/modal.component';
import { MenuService } from '../../../data/menu/menu.service';
import { QuestionService } from '../../../data/question/question.service';
import { IDataMenu } from '../../../data/menu/data-menu';

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
  ],
})
export class SettingsQuestionsComponent {
  public valueToggle!: boolean | null;
  public dataMenu!: IDataMenu[];
  public activeNumOfQuestions = 20;
  public ms = inject(MenuService);
  public qs = inject(QuestionService);
  constructor() {
    this.activeNumOfQuestions = this.ms.getActiveNumOfQuestions();
    this.dataMenu = this.ms.getData();
    this.valueToggle = this.ms.getValueToggle();
  }
  public changeToggle(toggle: boolean): void {
    this.valueToggle = null;
    this.ms.setValueToggle(toggle);
    this.ms.setActiveModal(toggle);
    console.log(this.ms.getValueToggle());
  }
  public changeNumOfQuestions(numOfQuestions: number): void {
    this.activeNumOfQuestions = numOfQuestions;
    this.ms.setActiveNumOfQuestions(numOfQuestions);
    console.log(this.activeNumOfQuestions);
  }
}
