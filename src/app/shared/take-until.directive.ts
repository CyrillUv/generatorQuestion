import { Directive, OnDestroy } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';

@Directive()
export class TakeUntilDirective implements OnDestroy {
  //стрим уничтожения:)
  private destroy$: Subject<void> = new Subject<void>();

  ngOnDestroy(): void {
    //При удалении компонента стрим продолжается
    this.destroy$.next();
    //и завершается
    this.destroy$.complete();
  }

  public takeUntil<T>(stream$: Observable<T>): Observable<T> {
    //принимает стрим и
    //используется rxjs метод takeUntil
    return stream$.pipe(takeUntil(this.destroy$));
  }
}
