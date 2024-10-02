import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NgIf } from '@angular/common';
import { QuestionsTimerPipe } from './questions-timer.pipe';
import { TakeUntilDestroy } from '../../shared/take-until-destroy';
import { interval } from 'rxjs';
import { IQuestion, NameDataType } from '../../data/question/type';
import { DataQuestService } from '../../data/question/data-quest.service';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [RouterLink, NgIf, QuestionsTimerPipe],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css',
})
export class QuestionsComponent extends TakeUntilDestroy {
  public categories!: NameDataType[];
  public questions!: IQuestion[];
  public activeQuestion!: IQuestion;
  public count = 0;
  public timerFlag = false;
  public numQuestion = 0;
  public lastQuestion = 10;

  constructor(public ds: DataQuestService) {
    super();
  }

  public getCategories(): void {
    this.categories = this.ds.getCategories();
  }

  public setStatistic(timerValue: string): void {
    this.ds.setStatistic(timerValue);
    this.ds.arrayTime.shift();
    this.ds.arrayTime.push(this.count);
    this.ds.nullingRequestsForQuest(this.ds.getArrayOfUnanswered());
  }

  public startTimer(): void {
    this.timerFlag = true;

    this.takeUntilDestroy(interval(1000)).subscribe(() => {
      this.count += 1;
    });
  }

  public getQuestions(category: NameDataType): void {
    this.questions = this.ds.getQuestions(category);
  }

  public randomizeQuestion(): void {
    if (!this.timerFlag) this.startTimer();
    if (this.timerFlag) {
      this.ds.arrayTime.push(this.count);
      console.log(this.ds.arrayTime);
      this.numQuestion += 1;
    }
    this.getCategories();
    this.getQuestions('Структуры данных');
    this.activeQuestion =
      this.ds.getData()[
        Math.floor(Math.random() * this.categories.length)
      ].questions[Math.floor(Math.random() * this.questions.length)];
  }

  public unansweredQuestion(): void {
    this.questions.map((el) => (el.active = false));
    this.activeQuestion.active = true;
    this.ds.getArrayOfUnanswered().push(this.activeQuestion);
  }
}
