import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, finalize, Observable, tap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  //стрим отвечающий за загрузку
  public isLoading$ = new BehaviorSubject<boolean>(false);

  public loading(req$: Observable<any>, load = true): Observable<any> {
    //если флаг загрузки валиден,происходит задержка и начинается загрузка,иначе просто получаем ответ
    if (load) {
      return req$.pipe(
        tap(() => {
          this.isLoading$.next(true);
        }),
        delay(1000),
        finalize(() => {
          this.isLoading$.next(false);
        }),
      );
    } else {
      return req$;
    }
  }
  //Загрузка при входе на страницу,сейчас отсутсует,т.к. присутствует загрузочная планка
  public initLoading(): void {
    this.isLoading$.next(true);
    timer(3000).subscribe(() => {
      this.isLoading$.next(false);
    });
  }
}
