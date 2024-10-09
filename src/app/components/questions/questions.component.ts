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
  public lastQuestion = 20;
  constructor(
    public qs: QuestionService,
    public ms: MenuService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.qs.getAllQuestions();
    this.lastQuestion = this.ms.getActiveNumOfQuestions();
    this.createActualQuestions();
  }

  public createActualQuestions(): void {
    this.getQuestions();
    this.qs.setActualQuestions(
      this.questions.filter((el) => !this.ms.getPassedQuestions().includes(el)),
    );
  }
  public getCategories(): void {
    this.categories = this.qs.getCategories();
  }
  public addPassedQuestions(passedQuestions: IQuestion): void {
    this.randomizeQuestion();
    if (
      !this.qs.getArrayOfUnanswered().includes(passedQuestions) &&
      !this.ms.getPassedQuestions().includes(passedQuestions)
    ) {
      this.ms.setPassedQuestions(passedQuestions);
    }
    console.log('passed', this.ms.getPassedQuestions());
    console.log('actual', this.qs.getActualQuestions());
    console.log('question', this.questions);
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

  public getQuestions(category: NameDataType = 'all'): void {
    this.questions = this.qs.getQuestions(category);
  }

  public randomizeQuestion(): void {
    console.log(this.qs.getActualQuestions().length);
    this.createActualQuestions();
    if (!this.timerFlag) this.startTimer();
    if (this.timerFlag) {
      this.qs.arrayTime.push(this.time);
    }
    this.getCategories();
    this.getQuestions();
    this.activeQuestion =
      this.questions[Math.floor(Math.random() * this.questions.length)];
    if (this.ms.getPassedQuestions().includes(this.activeQuestion)) {
      this.randomizeQuestion();
    } else {
      this.numQuestion += 1;
    }
  }

  public unansweredQuestion(): void {
    this.questions.map((el) => (el.active = false));
    this.activeQuestion.active = true;
    this.qs.getArrayOfUnanswered().push(this.activeQuestion);
  }
}
