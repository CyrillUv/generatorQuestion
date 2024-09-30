import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { DataQuestService } from '../data/question/data-quest.service';

@Injectable({
  providedIn: 'root',
})
export class ActivateStatistics implements CanActivate {
  constructor(
    private _ds: DataQuestService,
    private _router: Router,
  ) {}

  public canActivate(): boolean {
    if (this._ds.getStatistic() !== '0' && this._ds.getArrayTime().length) {
      return true;
    }
    this._router.navigate(['']);
    return false;
  }
}
