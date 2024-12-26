import {
  AUTHORIZATION_TOKEN$,
  CURRENT_USER_TOKEN$,
} from './data';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { APP_INITIALIZER, Provider } from '@angular/core';
import { Router } from '@angular/router';
import { ApiAuthService, IProfile, IUser } from './components';

export const currentUserProvider: Provider = {
  provide: CURRENT_USER_TOKEN$,
  useValue: new BehaviorSubject(null),
};

export const authProvider: Provider = {
  provide: AUTHORIZATION_TOKEN$,
  useValue: new BehaviorSubject(false),
};

export const initializerProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: (
    currentUser: BehaviorSubject<IUser>,
    authorized: BehaviorSubject<boolean>,
    _router: Router,
    apiAuthService: ApiAuthService,
  ) => {
    return () => {
      return new Promise<void>((resolve) => {
        apiAuthService
          .getCurrentUser()
          .pipe(
            catchError(() => {
              return of([]);
            }),
          )
          .subscribe((currentUsers) => {
            if (currentUsers && currentUsers.length > 0) {
              const currUser = currentUsers[0];

              // Если текущий пользователь найден, просто разрешаем Promise.
              currentUser.next(currUser);
              authorized.next(true);

              resolve();
            } else {
              // Если пользователь не найден, перенаправляем его на /auth
              _router.navigate(['/auth']).then(() => resolve());
            }
          });
      });
    };
  },
  deps: [CURRENT_USER_TOKEN$, AUTHORIZATION_TOKEN$, Router, ApiAuthService],
  multi: true,
};

export const appProvider: Provider[] = [
  currentUserProvider,
  authProvider,
  initializerProvider,
];
