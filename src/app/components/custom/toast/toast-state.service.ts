import { ToastStatus } from './toast.component';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface IConfig {
  title?: string;
  type?: ToastStatus;
  description?: string;
  timer?: number;
}
@Injectable({
  providedIn: 'root',
})
export class ToastStateService {
  public activeToast$ = new BehaviorSubject<boolean>(false);
  public changeConfig$ = new Subject<IConfig>();
}
