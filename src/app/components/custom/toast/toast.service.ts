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
    console.log(1)
    //активация тоста
    this._activeToast();
  }
  //активация тоста
  private _activeToast(): void {
    console.log(2)
    this.toastStateService.activeToast$.next(true);
  }
}
