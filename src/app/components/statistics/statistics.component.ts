import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { QuestionsTimerPipe } from '../questions/questions-timer.pipe';
import { DataQuestService } from '../../data/question/data-quest.service';
import { IQuestion } from '../../data/question/type';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    RouterLink,
    QuestionsTimerPipe,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
})
export class StatisticsComponent implements OnInit {
  public arithmeticMean = 0;
  public hardQuestion = 0;

  constructor(public ds: DataQuestService) {}

  ngOnInit(): void {
    this.ds.getStatistic();

    this.statisticTimeQuestion();
  }

  public statisticTimeQuestion(): void {
    const array: number[] = [];
    const arrayTimeQuestions: number[] = this.ds.getArrayTime();
    for (let i = 0; i < arrayTimeQuestions.length - 1; i++) {
      array.push(arrayTimeQuestions[i + 1] - arrayTimeQuestions[i]);
    }
    this.hardQuestion = Math.max(...array);
    this.arithmeticMean =
      array.reduce((acc, el) => acc + el, 0) / arrayTimeQuestions.length;
  }

  public openRequest(unanswered: IQuestion): void {
    unanswered.active = !unanswered.active;
  }
}
