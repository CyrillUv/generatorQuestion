import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {IQuestion, NameDataType} from "../../data/type";
import {DataService} from "../../data/data.service";
import {NgIf} from "@angular/common";
import {QuestionsTimerPipe} from "./questions-timer.pipe";
import {TakeUntilDestroy} from "../../shared/take-until-destroy";
import {interval} from "rxjs";


@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    QuestionsTimerPipe
  ],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css'
})
export class QuestionsComponent
  extends TakeUntilDestroy {

  public categories!: Array<NameDataType>;
  public questions!: Array<IQuestion>;
  public question1!: IQuestion;
  public count = 0;
  public timerFlag = false
  public numQuestion = 0
  public lastQuestion = 10
  public arrayTime: Array<number> = []

  constructor(private dataService: DataService
  ) {
    super();
  }


  public getCategories(): void {
    this.categories = this.dataService.getCategories()
  }

  public setStatistic(timerValue: string): void {
    this.dataService.setStatistic(timerValue)
    this.arrayTime.shift()
    this.arrayTime.push(this.count)
    console.log(this.arrayTime)

  }

  public startTimer(): void {
    this.timerFlag = true

    this.takeUntilDestroy(interval(1000)
    )
      .subscribe(
        () => {
          this.count += 1;
        })
  }

  public getQuestions(category: NameDataType): void {
    this.questions = this.dataService.getQuestions(category)
  }

  public randomizeQuestion(): void {
    if (!this.timerFlag)
      this.startTimer()
    if (this.timerFlag) {
      this.arrayTime.push(this.count)
      console.log(this.arrayTime)
      this.numQuestion += 1
    }
    this.getCategories()
    this.getQuestions('Структуры данных')
    console.log((Math.floor(Math.random() * this.categories.length) + 1), 'категория', (Math.floor(Math.random() * this.questions.length) + 1), 'вопрос')
    this.question1 = this.dataService.getData()[(Math.floor(Math.random() * this.categories.length))]
      .questions[Math.floor(Math.random() * this.questions.length)]
  }
}
