import {Subscription} from "rxjs";
import {Directive, OnDestroy} from "@angular/core";

@Directive()
export class Subscribers implements OnDestroy{
  public readonly subscribers:Subscription[] = [];

  public subscriber!:Subscription;

  ngOnDestroy(): void {
    if(!this.subscribers?.length) return;
    this.subscribers.forEach(el=>el.unsubscribe());
    this.subscriber.unsubscribe();
  }
}
