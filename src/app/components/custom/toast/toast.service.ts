import { Injectable } from '@angular/core';
import { IConfig, ToastStateService } from './toast-state.service';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private readonly toastStateService: ToastStateService) {}
  public openToast(config?: IConfig): void {
    if (config) {
      //изменение настроек тоста
      this.toastStateService.changeConfig$.next(config);
    }
    //активация тоста
    this._activeToast();
  }
  //активация тоста
  private _activeToast(): void {
    this.toastStateService.activeToast$.next(true);
  }
}
