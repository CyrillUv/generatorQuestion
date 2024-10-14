import { MenuService } from '../../data/menu/menu.service';
import { IDataMenu } from '../../data/menu/data-menu';
import { QuestionService } from '../../data/question/question.service';
import { inject } from '@angular/core';

export abstract class SettingsComponent {
  public dataMenu!: IDataMenu[];
  public activeNumOfQuestions = 20;
  public activeBlockTests = 1;

  public valueToggle: boolean | null = null;
  public ms = inject(MenuService);
  public qs = inject(QuestionService);
  constructor() {
    this.activeNumOfQuestions = this.ms.getActiveNumOfQuestions();
    this.dataMenu = this.ms.getData();
  }

  public changeToggle(toggle: boolean): void {
    this.valueToggle = null;
    this.ms.setActiveModal(toggle);
    console.log(this.ms.getActiveModal());
  }
}
