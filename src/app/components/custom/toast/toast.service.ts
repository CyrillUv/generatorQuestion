import { Injectable } from '@angular/core';
import { IConfig, ToastStateService } from './toast-state.service';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private readonly toastStateService: ToastStateService) {}
  public openToast(config?: IConfig): void {
    if (config) {
      this.toastStateService.changeConfig$.next(config);
    }
    this._activeToast();
  }

  private _activeToast(): void {
    this.toastStateService.activeToast$.next(true);
  }
}