import { Component, ViewContainerRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';

import { MenuService } from '../../data/menu/menu.service';

import { test } from './menu.animations';
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
  public activeModal!: boolean;

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
    this.activeModal = this.ms.getActiveModal();
  }

  public changeRoute(route: '/questions' | '/testing') {
    this.ms.setRoute(route);
    this.ms.setSettingMode(true);
    console.log(route);
    this.vcr.clear();
    // @ts-ignore
    this.vcr.createComponent(this.routeInComponent[route]);
  }
  public startAgain(): void {
    this.qs.nullingActualQuestions();
    this.ms.nullingPassedQuestions();
    console.log(
      'gPQ',
      this.ms.getPassedQuestions(),
      'gAQ',
      this.qs.getActualQuestions(),
    );
  }
}
