import {Injectable} from "@angular/core";
import {IAnswer, IDataTest} from "./type";
import {dataTests} from "./dataTest";

@Injectable({
  providedIn: "root"
})
export class DataTestService {
 private _data:IDataTest[]=dataTests
 private _successTestsMap = new Map<number,IAnswer>()
 public getData():IDataTest[]{
   return this._data;
 }
 public getSuccessTestsMap():Map<number,IAnswer>{
   return this._successTestsMap;
 }
 public setSuccessTestsMap(key:number,value:IAnswer):void{
   this._successTestsMap.set(key,value)
 }
}
