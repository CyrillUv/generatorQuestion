import { Inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AUTHORIZATION_TOKEN$, CURRENT_USER_TOKEN$} from '../data';
import {BehaviorSubject, from, Observable, of, switchMap, tap} from 'rxjs';
import {ApiAuthService, IUser} from '../components';
import {ProfileStateService} from "../components/profile/services/profile-state.service";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AUTHORIZATION_TOKEN$) private authToken$: BehaviorSubject<boolean>,
    private _router: Router,
  ) {}

  public canActivate(): Observable<boolean> {
    if (this.authToken$.value) {
      return of(true);
    } else {
      return from(this._router.navigate(['/auth']).then((r) => r));
    }
  }
}


@Injectable({
  providedIn: 'root',
})
export class AntiAuthGuard implements CanActivate {
  constructor(
    @Inject(AUTHORIZATION_TOKEN$) private authToken$: BehaviorSubject<boolean>,
    @Inject(CURRENT_USER_TOKEN$) private currentUser$: BehaviorSubject<IUser | null>,
    private apiAuthService: ApiAuthService,private profileStateService:ProfileStateService,
  ) {}

  public canActivate(): Observable<boolean> {
    if(this.authToken$.value && this.currentUser$.value) {
      return this.apiAuthService.deleteCurrentUser(((this.currentUser$.value as IUser).id as string)).
        pipe(
          tap(() => {
            this.currentUser$.next(null);
            this.authToken$.next(false);
            this.profileStateService.profile$.next(null)
          }),
        switchMap(() => of(true))
      )
    } else {
      return of(true)
    }

  }
}
