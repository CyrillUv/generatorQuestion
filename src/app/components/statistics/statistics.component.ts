import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { QuestionsTimerPipe } from '../questions/questions-timer.pipe';
import { QuestionService } from '../../data/question/question.service';
import { IQuestion } from '../../data/question/type';
import { NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { IWrongTest, TestingService } from '../../data/testing/testing.service';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    RouterLink,
    QuestionsTimerPipe,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    NgIf,
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
})
export class StatisticsComponent implements OnInit {
  public arithmeticMean = 0;
  public hardQuestion = 0;
  constructor(
    public ds: QuestionService,
    public ts: TestingService,
  ) {}

  ngOnInit(): void {
    if (this.ds.arrayTime.length) this.statisticTime(this.ds.arrayTime);
    if (this.ts.arrayTime.length) this.statisticTime(this.ts.arrayTime);
  }

  public statisticTime(arrayTime: number[]): void {
    const array: number[] = [];
    for (let i = 0; i < arrayTime.length - 1; i++) {
      array.push(arrayTime[i + 1] - arrayTime[i]);
    }
    this.hardQuestion = Math.max(...array);
    this.arithmeticMean =
      array.reduce((acc, el) => acc + el, 0) / arrayTime.length;
  }

  public openRequestQuestion(unanswered: IQuestion): void {
    unanswered.active = !unanswered.active;
  }
  public openRequestTest(unanswered: IWrongTest): void {
    unanswered.correct = !unanswered.correct;
  }
}
