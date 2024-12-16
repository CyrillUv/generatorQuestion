import { ErrorHandler, Injectable } from '@angular/core';
import { ToastService, ToastStatus } from '../custom';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private toastService: ToastService) {}

  public handleError(error: any): void {
    console.log(error);
    if (!(error instanceof HttpErrorResponse)) {
      error = error.rejection; // get the error object
    }

    this.toastService.openToast({
      title: 'Запусти бэк!',
      type: ToastStatus.warning,
      description: error?.message || 'Undefined client error',
      timer: 5000,
    });
  }
}
