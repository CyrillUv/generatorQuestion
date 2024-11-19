// import { ErrorHandler, Injectable } from '@angular/core';
// import { ToastStatus } from '../custom/toast/toast.component';
// import { ToastService } from '../custom/toast/toast.service';
// import { timer } from 'rxjs';
// import { Router } from '@angular/router';
//
// @Injectable()
// export class GlobalErrorHandler implements ErrorHandler {
//   constructor(
//     private toastService: ToastService,
//     private router: Router,
//   ) {}
//
//   public handleError(error: any): void {
//     // Логируйте ошибку или обрабатывайте ее другим образом
//
//     this.toastService.openToast({
//       title: 'Страница не найдена!',
//       type: ToastStatus.warning,
//       description: error,
//       timer: 1000,
//     });
//
//   }
// }
