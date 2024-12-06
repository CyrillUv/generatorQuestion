import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
// import { GlobalErrorHandler } from './app/components/handlers/global-error-handler';
// import { Injector } from '@angular/core';
// import { ToastService } from './app/components/custom/toast/toast.services';
bootstrapApplication(AppComponent, appConfig).then((r) => r);
//   .catch((err) => {
//   const injector = Injector.create({
//     providers: [{ provide: ToastService, deps: [] }],
//   });
//
//   // Инициализируем обработчик ошибок через инъекцию
//   const errorHandler = injector.get(GlobalErrorHandler);
//   errorHandler.handleError(err);
// });
