import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgForOf, NgIf, NgStyle } from '@angular/common';
import { TestingService } from '../../../data/testing/testing.service';
import { IAnswer, IDataTest } from '../../../data/testing/type';
import { CorrectDirective } from '../../../directive/correct.directive';
import { interval } from 'rxjs';
import { TakeUntilDestroy } from '../../../shared/take-until-destroy';
import { QuestionsTimerPipe } from '../../questions/questions-timer.pipe';
import { MenuService } from '../../../data/menu/menu.service';

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
  ],
  styleUrl: 'panel-testing.component.scss',
})
export class PanelTestingComponent extends TakeUntilDestroy implements OnInit {
  public activeTest!: IDataTest;
  public arrTest: IDataTest[] = [];
  public selectAnswer = false;
  public time = 0;
  public separatorResult!: number;
  public fullMode = false;

  private pack = 20;

  constructor(
    public ts: TestingService,
    private ms: MenuService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.arrTest = this.ts.getData();
    this.separatorResult = this.pack * this.ms.getActiveBlockTests();
    this.activeTest =
      this.arrTest[this.pack * this.ms.getActiveBlockTests() - 15];
    this.startTimer();
  }

  public findTest(id: number): void {
    this.activeTest = this.arrTest.find((test) => test.id === id) as IDataTest;
    this.selectAnswer = this.ts.getSuccessTestsMap().has(this.activeTest.id);
  }

  public clickAnswer(answer: IAnswer) {
    this.ts.setSuccessTestsMap(this.activeTest.id, answer);
    this.selectAnswer = true;
  }

  public correctKeyInMap(id: number): boolean | undefined {
    if (!this.ts.getSuccessTestsMap().has(id)) return;
    return this.ts.getSuccessTestsMap().get(id)?.correct as boolean;
  }

  public correctAnswerInMap(title: string): boolean | undefined {
    if (
      this.ts.getSuccessTestsMap().has(this.activeTest.id) &&
      this.ts.getSuccessTestsMap().get(this.activeTest.id)?.title === title
    ) {
      return this.ts.getSuccessTestsMap().get(this.activeTest.id)?.correct;
    } else return undefined;
  }

  public testsSeparator(): IDataTest[] {
    return this.arrTest.filter(
      (test) =>
        test.id > this.separatorResult - 20 && test.id <= this.separatorResult,
    );
  }

  public choiceOfAnswer(id: number) {
    this.ts.changeArrayOfUnanswered(
      id,
      this.activeTest.description,
      this.activeTest.name,
    );
    this.ts.arrayTime.push(this.time);
  }

  public startTimer(): void {
    this.takeUntilDestroy(interval(1000)).subscribe(() => {
      this.time += 1;
    });
  }

  public nextPackTests(): void {
    this.separatorResult += 20;
    console.log(this.pack);
    console.log(this.arrTest.length);
  }
  public setStatistic(timerValue: string): void {
    console.log(this.ts.arrayTime);
    this.ts.setStatistic(timerValue);
    this.ts.arrayTime.shift();
    this.ts.arrayTime.push(this.time);
    this.ts.nullingRequestsForTest(this.ts.getArrayOfUnanswered());
  }

  public prevPackTests(): void {
    this.separatorResult -= 20;
  }
}
