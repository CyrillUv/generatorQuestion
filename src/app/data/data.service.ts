import { Injectable } from '@angular/core';
import {data} from "./data";
import {IData, IQuestion, NameDataType} from "./type";

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public id = false;
  private data = data;
  private statistic = '0'
  public arrayTime: Array<number> = []
  public arrayOfUnanswered: Array<string> = []

  constructor() {

  }
  public getArrayTime(): Array<number> {
    return this.arrayTime
  }
  public getArrayOfUnanswered(): Array<string>{
    return this.arrayOfUnanswered
  }
  public getCategories():Array<NameDataType>{
    return this.data.map(obj => obj.name);
  }
  public getQuestions(category:NameDataType): Array<IQuestion>{
  return (this.data.find(obj=> obj.name===category) as IData).questions
  }
  public getData():Array<IData>{
    return this.data
  }
  public getStatistic():string{
    return this.statistic
  }
  public setStatistic(statistic:string):void{
     this.statistic = statistic;
  }


}
