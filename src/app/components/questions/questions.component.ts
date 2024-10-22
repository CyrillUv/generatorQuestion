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
  //Массив категорий
  public categories!: NameDataType[];
  //Массив вопросов
  public questions!: IQuestion[];
  //Активный вопрос
  public activeQuestion!: IQuestion;
  //Время ответов на вопросы
  public timeQuestion = 0;
  //Флаг для начала отсчета таймера
  public timerFlag = false;
  //Номер вопроса
  public questionNumber = 0;
  //Количество вопросов
  public numberOfQuestion = 20;

  constructor(
    public qs: QuestionService,
    public ms: MenuService,
  ) {
    super();
  }

  ngOnInit(): void {
    //Получение всех вопросов
    this.qs.getAllQuestions();
    //Задание количества вопросов
    this.numberOfQuestion = this.ms.getCurrentNumOfQuestions();
    //Формирование массива вопросов
    this.createActualQuestions();
  }

  public getQuestions(category: NameDataType = 'all'): void {
    this.questions = this.qs.getQuestions(category);
  }

  //Формирование массива вопросов
  public createActualQuestions(): void {
    //получение массива по категориям
    this.getQuestions();
    //фильтрация массива вопросов от отвеченных
    this.qs.setActualQuestions(
      this.questions.filter((el) => !this.ms.getPassedQuestions().includes(el)),
    );
  }

  //Получение категорий
  public getCategories(): void {
    this.categories = this.qs.getCategories();
  }

  //Выделение пройденных вопросов от актуальных
  public addPassedQuestions(passedQuestions: IQuestion): void {
    //Получение случайного вопроса
    this.randomizeQuestion();
    //Если полученный вопрос правильно отвечен
    if (
      !this.qs.getArrayOfUnanswered().includes(passedQuestions) &&
      // и его нет в массиве завершенных,

      !this.ms.getPassedQuestions().includes(passedQuestions)
    ) {
      //добавляем его в массив завершенных
      this.ms.setPassedQuestions(passedQuestions);
    }
    //Закрывает ответы на вопросы
    this.questions.map((el) => (el.active = false));
  }

  //Обнуление ответов на вопросы
  public nullingRequestsForQuest(questions: IQuestion[]): void {
    //Пробегается по каждому вопросу и делает неотвеченным вопрос
    questions.forEach((question) => {
      question.active = false;
    });
  }

  //Получение статистики
  public setStatistic(timerValue: string): void {
    //Статистика по времени
    this.qs.setStatistic(timerValue);
    //Удаление первого элемента массива времени(лишний ноль)
    this.qs.arrayTime.shift();
    //Добавление в массив времени ответа на вопрос
    this.qs.arrayTime.push(this.timeQuestion);
    //Обнуление ответов на вопросы
    this.nullingRequestsForQuest(this.qs.getArrayOfUnanswered());
  }

  //Начало прохождения
  public startTimer(): void {
    //Начало отсчета времени
    this.timerFlag = true;
    //Механизм отсчета
    this.takeUntilDestroy(interval(1000)).subscribe(() => {
      this.timeQuestion += 1;
    });
  }

  //Получение случайного вопроса
  public randomizeQuestion(): void {
    //Создание массива актуальных вопросов
    this.createActualQuestions();
    //Если флаг неверный,запускаем таймер,иначе пушим время в массив
    if (!this.timerFlag) this.startTimer();
    else {
      this.qs.arrayTime.push(this.timeQuestion);
    }
    //получение категорий
    this.getCategories();
    //получение вопросов
    this.getQuestions();
    //получение случайного вопроса
    this.activeQuestion =
      this.questions[Math.floor(Math.random() * this.questions.length)];
    //Если активный вопрос относится к отвеченным,
    if (this.ms.getPassedQuestions().includes(this.activeQuestion)) {
      //получаем другой случайный вопрос
      this.randomizeQuestion();
    } else {
      //иначе остается прежний
      this.questionNumber += 1;
    }
  }
  //Добавление ложного ответа на вопрос
  public incorrectQuestion(): void {
    //Появление правильного ответа
    this.activeQuestion.active = true;
    //Делает активный вопрос не пройденным
    this.qs.addIncorrectQuestions(this.activeQuestion);
  }
}
