import { Injectable } from '@angular/core';
import {data} from "./data";
import {IData, IQuestion, NameDataType} from "./type";

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private data = data;

  constructor() { }
  public getCategories():Array<NameDataType>{
    return this.data.map(obj => obj.name);
  }
  public getQuestions(category:NameDataType): Array<IQuestion>{
  return (this.data.find(obj=> obj.name===category) as IData).questions
  }
}
