import {Component, Input, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Observable, retry, Subject, takeUntil, timer} from "rxjs";
import {IQuestion, NameDataType} from "../../data/type";
import {DataService} from "../../data/data.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css'
})
export class QuestionsComponent {
  categories!: Array<NameDataType>;
  questions!: Array<IQuestion>;
  constructor(private dataService: DataService) {
  }
  public categoryRandomNum: number = 3

  public questionRandomNum: number = 10
  public question1!: IQuestion
  public getCategories():void{
    this.categories = this.dataService.getCategories()
  }
  public getQuestions(category:NameDataType):void{
    this.questions = this.dataService.getQuestions(category)
  }
  public randomizeQuestion(): void {
    this.getCategories()
    this.getQuestions('Структуры данных')
    console.log((Math.floor(Math.random()*this.categories.length)+1),'категория',(Math.floor(Math.random()*this.questions.length)+1),'вопрос')
    this.question1 = this.dataService.getData()[(Math.floor(Math.random()*this.categories.length))]
      .questions[Math.floor(Math.random()*this.questions.length)]
  }
}
