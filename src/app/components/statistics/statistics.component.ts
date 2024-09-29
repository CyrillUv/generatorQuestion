import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { QuestionsTimerPipe } from '../questions/questions-timer.pipe';
import { DataQuestService } from '../../data/question/dataQuest.service';
import { IQuestion } from '../../data/question/type';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [RouterLink, QuestionsTimerPipe],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
})
export class StatisticsComponent implements OnInit {
  public arithmeticMean = 0;
  public hardQuestion = 0;

  constructor(public ds: DataQuestService) {}

  ngOnInit(): void {
    this.ds.getStatistic();

    this.statisticTimeQuestion();
    console.log(this.arithmeticMean);

    if (true) {
      const cat = 'dog';
    } else if (false) {
      let fog = 'cat';
    }
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
