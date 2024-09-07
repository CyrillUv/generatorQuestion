import { Injectable } from '@angular/core';
import {data} from "./data";
import {IData, IQuestion, NameDataType} from "./type";

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public id = false;
  private _data = data;
  private _statistic = '0'
  public arrayTime: Array<number> = []
  public arrayOfUnanswered: Array<IQuestion> = []

  constructor() {

  }
  public getArrayTime(): Array<number> {
    return this.arrayTime
  }
  public getArrayOfUnanswered(): Array<IQuestion>{
    return this.arrayOfUnanswered
  }
  public nullingArrayOfUnanswered():void{
     this.arrayOfUnanswered=[]
  }
  public getCategories():Array<NameDataType>{
    return this._data.map(obj => obj.name);
  }
  public getQuestions(category:NameDataType): Array<IQuestion>{
  return (this._data.find(obj=> obj.name===category) as IData).questions
  }
  public getData():Array<IData>{
    return this._data
  }
  public getStatistic():string{
    return this._statistic
  }
  public setStatistic(statistic:string):void{
     this._statistic = statistic;
  }
  public nullingRequestsForQuest(questions:Array<IQuestion>):void{
    questions.forEach(question=>{question.active=false})
  }

}
