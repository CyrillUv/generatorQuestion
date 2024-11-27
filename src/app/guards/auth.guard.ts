import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {MenuService} from "../data/menu/menu.service";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private ms:MenuService,private _router: Router)  {
  }
  public canActivate(): boolean {
    //Если массив времени проходения вопросов не пуст или
    if (this.ms.getAuthorized()) {
      return true;
    }

    //иначе посылает нахуй в меню
    this._router.navigate(['/auth']).then((r) => r);
    return false;
  }
}
