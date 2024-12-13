import {ErrorHandler, Injectable, NgZone} from '@angular/core';
import { timer } from 'rxjs';
import { Router } from '@angular/router';
import {ToastService} from "../custom/toast/toast.service";
import {ToastStatus} from "../custom/toast/toast.component";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private toastService: ToastService,
  ) {}

  public handleError(error: any): void {
    console.log(error)
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
