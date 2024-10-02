import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgForOf, NgIf, NgStyle } from '@angular/common';
import { DataTestService } from '../../../data/testing/data-test.service';
import { IAnswer, IDataTest } from '../../../data/testing/type';
import { CorrectDirective } from '../../../directive/correct.directive';

@Component({
  selector: 'app-panel-testing',
  templateUrl: 'panel-testing.component.html',
  standalone: true,
  imports: [RouterLink, NgForOf, CorrectDirective, NgStyle, NgIf],
  styleUrl: 'panel-testing.component.scss',
})
export class PanelTestingComponent implements OnInit {
  public page = 'Тестирование';
  public activeTest!: IDataTest;
  public arrTest: IDataTest[] = [];
  public selectAnswer = false;
  public pack = 20;

  constructor(public dt: DataTestService) {}

  ngOnInit(): void {
    this.arrTest = this.dt.getData();
    this.activeTest = this.arrTest[0];
  }

  public findTest(id: number): void {
    this.activeTest = this.arrTest.find((test) => test.id === id) as IDataTest;
    this.selectAnswer = this.dt.getSuccessTestsMap().has(this.activeTest.id);
  }

  public clickAnswer(answer: IAnswer) {
    this.dt.setSuccessTestsMap(this.activeTest.id, answer);
    this.selectAnswer = true;
  }

  public correctKeyInMap(id: number): boolean | undefined {
    if (!this.dt.getSuccessTestsMap().has(id)) return;

    return this.dt.getSuccessTestsMap().get(id)?.correct as boolean;
  }

  public correctAnswerInMap(title: string): boolean | undefined {
    if (
      this.dt.getSuccessTestsMap().has(this.activeTest.id) &&
      this.dt.getSuccessTestsMap().get(this.activeTest.id)?.title === title
    ) {
      return this.dt.getSuccessTestsMap().get(this.activeTest.id)?.correct;
    } else return undefined;
  }

  public testsSeparator(): IDataTest[] {
    return this.arrTest.filter(
      (test) => test.id > this.pack - 20 && test.id <= this.pack,
    );
  }

  public nextPackTests(): void {
    this.pack += 20;
  }

  public prevPackTests(): void {
    this.pack -= 20;
  }
}
