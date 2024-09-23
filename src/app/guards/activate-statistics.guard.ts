import {DataService} from "../data/data.service";
import {CanActivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable(
  {
    providedIn: "root",
  }
)
export class ActivateStatistics implements CanActivate {
  constructor(private _ds:DataService,private _router:Router) {}
  public canActivate():boolean {
    if(this._ds.getStatistic()!=='0'&&this._ds.getArrayTime().length){
    return true
    }
    this._router.navigate([''])
    return false
  }
}
