import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuestionService } from '../../data/question/question.service';
import { IQuestion } from '../../data/question/type';
import { NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { IWrongTest, TestingService } from '../../data/testing/testing.service';
import {QuestionsTimerPipe} from "../../shared/questions-timer.pipe";

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
  //среднее арифметическое время ответа
  public arithmeticMean = 0;
  //Самое долгое время ответа
  public hardQuest = 0;
  constructor(
    public qs: QuestionService,
    public ts: TestingService,
  ) {}

  ngOnInit(): void {
    //Выбор статистики при выполнении определенного раздела
    //проверка длины массива прохождения вопросов
    if (this.qs.arrayTime.length) this.statisticTime(this.qs.arrayTime);
    //проверка длины массива прохождения тестов
    if (this.ts.arrayTime.length) this.statisticTime(this.ts.arrayTime);
  }
  //Формирование статистики времени
  public statisticTime(arrayTime: number[]): void {
    //массив отрезков времени между заданиями
    const arrayIntervals: number[] = [];
    for (let i = 0; i < arrayTime.length - 1; i++) {
      //добавление интервала в массив
      arrayIntervals.push(arrayTime[i + 1] - arrayTime[i]);
    }
    //Получение самого длительного задания
    this.hardQuest = Math.max(...arrayIntervals);
    //Получение среднего времени по прохождению задания
    this.arithmeticMean =
      arrayIntervals.reduce((acc, el) => acc + el, 0) / arrayTime.length;
  }
  //Открытие правильного ответа на вопрос
  public openRequestQuestion(unanswered: IQuestion): void {
    unanswered.active = !unanswered.active;
  }
  //Открытие правильного ответа на тест
  public openRequestTest(unanswered: IWrongTest): void {
    unanswered.correct = !unanswered.correct;
  }
}
