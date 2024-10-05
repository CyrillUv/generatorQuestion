import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NgIf } from '@angular/common';
import { QuestionsTimerPipe } from './questions-timer.pipe';
import { TakeUntilDestroy } from '../../shared/take-until-destroy';
import { interval } from 'rxjs';
import { IQuestion, NameDataType } from '../../data/question/type';
import { QuestionService } from '../../data/question/question.service';
import { MenuService } from '../../data/menu/menu.service';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [RouterLink, NgIf, QuestionsTimerPipe],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css',
})
export class QuestionsComponent extends TakeUntilDestroy implements OnInit {
  public categories!: NameDataType[];
  public questions!: IQuestion[];
  public activeQuestion!: IQuestion;
  public time = 0;
  public timerFlag = false;
  public numQuestion = 0;
  public lastQuestion = 10;

  constructor(
    public qs: QuestionService,
    public ms: MenuService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.lastQuestion = this.ms.getActiveNumOfQuestions();
  }

  public getCategories(): void {
    this.categories = this.qs.getCategories();
  }
  public nullingRequestsForQuest(questions: IQuestion[]): void {
    questions.forEach((question) => {
      question.active = false;
    });
  }

  public setStatistic(timerValue: string): void {
    this.qs.setStatistic(timerValue);
    this.qs.arrayTime.shift();
    this.qs.arrayTime.push(this.time);
    this.nullingRequestsForQuest(this.qs.getArrayOfUnanswered());
  }

  public startTimer(): void {
    this.timerFlag = true;

    this.takeUntilDestroy(interval(1000)).subscribe(() => {
      this.time += 1;
    });
  }

  public getQuestions(category: NameDataType): void {
    this.questions = this.qs.getQuestions(category);
  }

  public randomizeQuestion(): void {
    if (!this.timerFlag) this.startTimer();
    if (this.timerFlag) {
      this.qs.arrayTime.push(this.time);
      console.log(this.qs.arrayTime);
      this.numQuestion += 1;
    }
    this.getCategories();
    this.getQuestions('Структуры данных');
    this.activeQuestion =
      this.qs.getData()[
        Math.floor(Math.random() * this.categories.length)
      ].questions[Math.floor(Math.random() * this.questions.length)];
  }

  public unansweredQuestion(): void {
    this.questions.map((el) => (el.active = false));
    this.activeQuestion.active = true;
    this.qs.getArrayOfUnanswered().push(this.activeQuestion);
  }
}
