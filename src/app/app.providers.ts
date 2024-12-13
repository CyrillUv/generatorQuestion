import { AUTHORIZATION_TOKEN$, CURRENT_USER_TOKEN$ } from './data';
import {BehaviorSubject, catchError, of} from 'rxjs';
import { APP_INITIALIZER, Provider } from '@angular/core';
import { Router } from '@angular/router';
import { ApiAuthService, IUser } from './components';
import { ToastService } from './components/custom/toast/toast.service';
import { ToastStatus } from './components/custom/toast/toast.component';

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
    autorized: BehaviorSubject<boolean>,
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
          .subscribe((users) => {
            if (users && users.length > 0) {
              // Если текущий пользователь найден, просто разрешаем Promise.
              currentUser.next(users[0]);
              autorized.next(true);
              resolve();
              console.log('if', users);
            } else {
              // Если пользователь не найден, перенаправляем его на /auth
              _router.navigate(['/auth']).then(() => resolve());
            }
          });
      });
    };
  },
  deps: [
    CURRENT_USER_TOKEN$,
    AUTHORIZATION_TOKEN$,
    Router,
    ApiAuthService,
  ],
  multi: true,
};

export const appProvider: Provider[] = [
  currentUserProvider,
  authProvider,
  initializerProvider,
];
