import { BehaviorSubject } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { IUser } from '../../components';
export const AUTHORIZATION_TOKEN$ = new InjectionToken<BehaviorSubject<boolean>>(
  'AUTHORIZATION_TOKEN',
);

export const CURRENT_USER_TOKEN$ = new InjectionToken<BehaviorSubject<IUser>>(
  'CURRENT_USER_TOKEN',
);

