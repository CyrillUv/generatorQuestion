import {Directive, OnDestroy} from "@angular/core";
import {Observable, Subject, takeUntil} from "rxjs";

@Directive()
export class TakeUntilDirective implements OnDestroy{
  private destroy$: Subject<void> = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public takeUntil<T>(stream$: Observable<T>): Observable<T>{
    return stream$.pipe(
      takeUntil(this.destroy$)
    )
  }
}
