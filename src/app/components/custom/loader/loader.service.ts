import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, finalize, Observable, tap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  public isLoading$ = new BehaviorSubject<boolean>(false);

  public loading(req$: Observable<any>, load = true): Observable<any> {
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

  public initLoading(): void {
    this.isLoading$.next(true);
    timer(3000).subscribe(() => {
      this.isLoading$.next(false);
    });
  }
}
