import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef, inject } from '@angular/core';

export class TakeUntilDestroy {
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  //Происходит отписка от стрима с помощью takeUntilDestroyed
  public takeUntilDestroy<T>(stream$: Observable<T>): Observable<T> {
    return stream$.pipe(takeUntilDestroyed(this.destroyRef));
  }
}
