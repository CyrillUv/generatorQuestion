import {Injectable} from "@angular/core";
import {IDataTest} from "./type";
import {dataTests} from "./dataTest";

@Injectable({
  providedIn: "root"
})
export class DataTestService {
 private _data:Array<IDataTest>=dataTests
 public getData():Array<IDataTest>{
   return this._data;
 }
}
