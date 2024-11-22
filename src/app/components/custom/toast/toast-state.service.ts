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
  //активация тоста
  public activeToast$ = new BehaviorSubject<boolean>(false);
  //изменение настроек тоста
  public changeConfig$ = new Subject<IConfig>();
}
