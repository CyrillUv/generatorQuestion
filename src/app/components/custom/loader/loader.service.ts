import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, tap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  public isLoading$ = new BehaviorSubject<boolean>(false);

  public loading(req: Observable<any>): Observable<any> {
    this.isLoading$.next(true);
    return req.pipe(
      delay(1000),
      tap(() => {
        this.isLoading$.next(false);
      }),
    );
  }

  public initLoading(): void {
    this.isLoading$.next(true);
    timer(3000).subscribe(() => {
      this.isLoading$.next(false);
    });
  }
}
