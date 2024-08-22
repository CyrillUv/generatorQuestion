import {Component, inject, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {data} from "../../data/data";
import {DataService} from "../../data/data.service";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {QuestionsTimerPipe} from "../questions/questions-timer.pipe";

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
  public statistic = ''
  public arrayTimeQuestions:Array<number> = [1, 3, 4, 6, 7, 8, 9, 10, 11, 13]
  public arithmeticMean=0
  constructor(public data:DataService) {

  }
  ngOnInit(): void {
    this.getStatistics()
    console.log(this.statistic)
    this.arithmeticTimeQuestion()
    console.log(this.arithmeticMean)
  }
public getStatistics(): void{
  this.statistic = this.data.getStatistic()
}
public arithmeticTimeQuestion():void{
      let array = []
     array.push(this.arrayTimeQuestions[0])
     for(let i = 0;i < this.arrayTimeQuestions.length-1;i++){
       array.push(this.arrayTimeQuestions[i+1]-this.arrayTimeQuestions[i])
     }
     this.arithmeticMean=array.reduce((acc,el)=>acc+el,0)/this.arrayTimeQuestions.length
  console.log(array)
  }
}
