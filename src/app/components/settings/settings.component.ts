import { MenuService } from '../../data/menu/menu.service';
import { IDataMenu } from '../../data/menu/data-menu';
import { QuestionService } from '../../data/question/question.service';
import { inject } from '@angular/core';

export abstract class SettingsComponent {
  public valueToggle: boolean | null;
  public dataMenu!: IDataMenu[];
  public activeNumOfQuestions = 20;
  public activeBlockTests = 1;

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
}
