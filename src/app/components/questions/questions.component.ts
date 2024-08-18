import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {IQuestion, NameDataType} from "../../data/type";
import {DataService} from "../../data/data.service";
import {NgIf} from "@angular/common";
import {interval, tap} from "rxjs";
import {QuestionsTimerPipe} from "./questions-timer.pipe";
import {TakeUntilDestroy} from "../../shared/take-until-destroy";

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
  // extends Subscribers
  // extends TakeUntilDirective
  extends TakeUntilDestroy
  implements OnInit
  // OnDestroy
{

  public categories!: Array<NameDataType>;
  public questions!: Array<IQuestion>;
  public question1!: IQuestion;
  public count = 0;


  constructor(private dataService: DataService
  ) {
    super();

  }

  ngOnInit(): void {
    //subscription
    //   this.subscriber = interval(1000).subscribe(
    //     ()=>{
    //       this.count+=1;
    //       console.log(this.count)
    //     })

    //     this.subscribers.push(interval(1000).subscribe(()=>{
    //   this.count+=1;
    //     console.log(this.count)
    // }))


    this.takeUntilDestroy(interval(10)
    )
      .subscribe(
      () => {
        this.count += 1;
        console.log(this.count)
      })

    // this.takeUntil(interval(1000)).subscribe(
    //   ()=>{
    //   this.count+=1;
    //   console.log(this.count)
    // })
  }


  public getCategories(): void {
    this.categories = this.dataService.getCategories()
  }

  public getQuestions(category: NameDataType): void {
    this.questions = this.dataService.getQuestions(category)
  }

  public randomizeQuestion(): void {
    this.getCategories()
    this.getQuestions('Структуры данных')
    console.log((Math.floor(Math.random() * this.categories.length) + 1), 'категория', (Math.floor(Math.random() * this.questions.length) + 1), 'вопрос')
    this.question1 = this.dataService.getData()[(Math.floor(Math.random() * this.categories.length))]
      .questions[Math.floor(Math.random() * this.questions.length)]
  }
}
