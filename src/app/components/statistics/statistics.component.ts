import {Component, inject, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {data} from "../../data/data";
import {DataService} from "../../data/data.service";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {QuestionsTimerPipe} from "../questions/questions-timer.pipe";
import {IQuestion} from "../../data/type";

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    RouterLink,
    QuestionsTimerPipe
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit{
  public arithmeticMean=0
  public hardQuestion = 0
  constructor(public ds:DataService) {

  }
  ngOnInit(): void {
    this.ds.getStatistic()

    this.statisticTimeQuestion()
    console.log(this.arithmeticMean)

  }

public statisticTimeQuestion():void{
      let array:number[] = []
      let arrayTimeQuestions:Array<number> = this.ds.getArrayTime()
     for(let i = 0;i < arrayTimeQuestions.length-1;i++){
       array.push(arrayTimeQuestions[i+1]-arrayTimeQuestions[i])
     }
    this.hardQuestion = Math.max(...array)
    this.arithmeticMean = array.reduce((acc,el)=>acc+el,0)/arrayTimeQuestions.length
  }
public openRequest(unanswered:IQuestion):void{
    unanswered.active=!unanswered.active
}

}
