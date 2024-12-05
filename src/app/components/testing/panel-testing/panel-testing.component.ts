import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  AsyncPipe,
  NgForOf,
  NgIf,
  NgStyle,
  NgTemplateOutlet,
} from '@angular/common';
import { TestingService } from '../../../data/testing/testing.service';
import { IAnswer, IDataTest } from '../../../data/testing/type';
import { CorrectDirective } from '../../../directive/correct.directive';
import { interval, Observable, of, take } from 'rxjs';
import { TakeUntilDestroy } from '../../../shared/take-until-destroy';

import { MenuService } from '../../../data/menu/menu.service';
import { PaginatorComponent } from '../../custom/paginator/paginator.component';
import { TimerComponent } from '../../../shared/timer.component';
import {QuestionsTimerPipe} from "../../../shared/questions-timer.pipe";

@Component({
  selector: 'app-panel-testing',
  templateUrl: 'panel-testing.component.html',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    CorrectDirective,
    NgStyle,
    NgIf,
    QuestionsTimerPipe,
    PaginatorComponent,
    NgTemplateOutlet,
    AsyncPipe,
    TimerComponent,
  ],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: 'panel-testing.component.scss',
})
export class PanelTestingComponent extends TakeUntilDestroy implements OnInit {
  //Активный тест
  public activeTest!: IDataTest;
  //Глобальный массив тестов(для удобства)
  public arrTest: IDataTest[] = [];
  //Свойство для разрешения выбора ответа
  public isBlockingAnswer = false;
  //Таймер прохождения
  public time = 0;
  //Длина глобального массива тестов (для удобства) (separatorResult)
  public lengthOfAllData!: number;
  //Режим прохождения всех тестов
  public fullMode = false;
  //Пачка тестов
  public packOfTests = 20;
  //Разделяет тесты на блоки

  public get testsSeparator$(): Observable<IDataTest[] | null> {
    //Фильтрует массив всех тестов по условию сравнения первого и последнего элемента блока
    return of(
      this.arrTest.filter(
        (test) =>
          test.id > this.lengthOfAllData - this.packOfTests &&
          test.id <= this.lengthOfAllData,
      ),
    ).pipe(take(1));
  }
  constructor(
    public ts: TestingService,
    public ms: MenuService,
    public cdRef: ChangeDetectorRef,
  ) {
    super();
  }

  ngOnInit(): void {
    //Присваивание переменной данных тестов из сервиса
    this.arrTest = this.ts.getData();
    //Длина глобального массива тестов
    this.lengthOfAllData = this.arrTest.length;
    //Выбор первого теста из блока
    this.activeTest = this.arrTest[this.arrTest.length - this.packOfTests];
    //Начало прохождения тестирования
    // this.startTimer();
  }
  //Выбор  теста
  public pickTest(id: number): void {
    //Присваивает активному тесту,подходящий по идентификатору тест
    this.activeTest = this.arrTest.find((test) => test.id === id) as IDataTest;
    //Проверка выбран ли ответ в этом тесте
    this.isBlockingAnswer = this.ts
      .getSuccessTestsMap()
      .has(this.activeTest.id);
  }
  //Выбор ответа
  public pickAnswer(answer: IAnswer): void {
    //Добавление ответа на определенный тест
    this.ts.setSuccessTestsMap(this.activeTest.id, answer);
    //Блокирование выбора ответа
    this.isBlockingAnswer = true;
  }
  //Метод закинут в пагинатор
  // public correctKeyInMap(id: number): boolean | undefined {
  //   if (!this.ts.getSuccessTestsMap().has(id)) return;
  //   return this.ts.getSuccessTestsMap().get(id)?.correct as boolean;
  // }
  //
  public selectedAnswerInMap(title: string): boolean | undefined {
    if (
      //Если активный тест завершен
      this.ts.getSuccessTestsMap().has(this.activeTest.id) &&
      //Ответ совпадает с входящим
      this.ts.getSuccessTestsMap().get(this.activeTest.id)?.title === title
    ) {
      //Возвращается корректность ответа
      return this.ts.getSuccessTestsMap().get(this.activeTest.id)?.correct;
    }
    //Нужно чтобы не пройденные тесты были не отмечены цветом
    else return undefined;
  }
  //Выбор ответа
  public choiceOfAnswer(id: number): void {
    //Добавляет неправильные ответы для статистики
    this.ts.changeArrayOfUnanswered(
      id,
      this.activeTest.description,
      this.activeTest.name,
    );
    //Добавляет время прохождения одного теста
    this.ts.arrayTime.push(this.time);
  }

  public startTimer(): void {
    //Работа таймера
    this.takeUntilDestroy(interval(1000)).subscribe(() => {
      this.time += 1;
      this.cdRef.detectChanges();
    });
  }
  //Следующий пак тестов
  public nextPackTests(): void {
    this.lengthOfAllData += this.packOfTests;
  }
  //Создание статистики тестирования
  public setStatistic(timerValue: string): void {
    //Разчет статистики времени ответов на тесты
    this.ts.setStatistic(timerValue);
    //Удаление первого элемента массива времени (мешал расчетам)
    this.ts.arrayTime.shift();
    //Добавление времени в массив
    this.ts.arrayTime.push(this.time);
    //Обнуление неправильных ответов
    this.ts.nullingRequestsForTests(this.ts.getArrayOfUnanswered());
  }
  //Предыдущий пак тестов
  public prevPackTests(): void {
    this.lengthOfAllData -= this.packOfTests;
  }
}
