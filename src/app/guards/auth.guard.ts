import { Inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AUTHORIZATION_TOKEN } from '../data/tokens/tokens';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AUTHORIZATION_TOKEN) private authToken$: BehaviorSubject<boolean>,
    private _router: Router,
  ) {}

  public canActivate(): boolean {
    const auth = this.authToken$.value;

    //Если массив времени проходения вопросов не пуст или
    console.log(auth)
    if (auth) {
      // console.log('blyaaaaaaaaaa', this.authToken$.value)
      return true;
    }
    console.log('redirect');
    //иначе посылает нахуй в меню
    this._router.navigate(['/auth']).then((r) => r);
    return false;
  }
}
