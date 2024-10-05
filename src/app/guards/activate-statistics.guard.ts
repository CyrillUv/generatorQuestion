import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { QuestionService } from '../data/question/question.service';
import { TestingService } from '../data/testing/testing.service';

@Injectable({
  providedIn: 'root',
})
export class ActivateStatistics implements CanActivate {
  constructor(
    private _qs: QuestionService,
    private _ts: TestingService,
    private _router: Router,
  ) {}

  public canActivate(): boolean {
    if (this._qs.getArrayTime().length) {
      return true;
    }
    if (this._ts.getSuccessTestsMap().size) {
      return true;
    }
    this._router.navigate(['']).then((r) => r);
    return false;
  }
}
