import {Observable} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {DestroyRef, inject} from "@angular/core";
import {Router} from "@angular/router";

export class TakeUntilDestroy  {
  private readonly destroyRef: DestroyRef = inject(DestroyRef)

  public takeUntilDestroy<T>(stream$: Observable<T>): Observable<T>{
    return stream$.pipe(
      takeUntilDestroyed(this.destroyRef)
    )
  }

}
// export class Test2 extends TakeUntilDestroy{
//   public id1 = '123123';
//
//   public TEST = new Test();
//   public id = this.TEST.id1;
// }
//
// export class Test extends Test2{
//   public override id = '234902438234dsklfl'
// }




