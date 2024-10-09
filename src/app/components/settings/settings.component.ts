import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../data/menu/menu.service';
import { IDataMenu } from '../../data/menu/data-menu';
import { QuestionService } from '../../data/question/question.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  public dataMenu!: IDataMenu[];
  public activeNumOfQuestions = 20;
  public activeBlockTests = 1;
  public activeModal = false;
  public valueToggle: boolean | null = null;
  constructor(
    public ms: MenuService,
    public qs: QuestionService,
  ) {}

  ngOnInit(): void {
    this.dataMenu = this.ms.getData();
    this.activeNumOfQuestions = this.ms.getActiveNumOfQuestions();
  }
  public changeToggle(toggle: boolean): void {
    this.valueToggle = null;
    this.activeModal = toggle;
  }
  public startAgain(): void {
    this.activeModal = false;
    this.valueToggle = null;
    this.qs.nullingActualQuestions();
    this.ms.nullingPassedQuestions();
  }

  public changeNumOfQuestions(numOfQuestions: number): void {
    this.activeNumOfQuestions = numOfQuestions;
    this.ms.setActiveNumOfQuestions(numOfQuestions);
    console.log(this.activeNumOfQuestions);
  }

  public changeActiveBlockTests(blockTests: number): void {
    this.activeBlockTests = blockTests;
    this.ms.setActiveBlockTests(blockTests);
    console.log(this.activeBlockTests);
  }

  public closeModal(): void {
    this.activeModal = false;
    this.valueToggle = false;
  }
}
