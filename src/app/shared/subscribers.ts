import { Subscription } from 'rxjs';
import { Directive, OnDestroy } from '@angular/core';

@Directive()
export class Subscribers implements OnDestroy {
  //Подпищикщи
  public readonly subscribers: Subscription[] = [];
  //подписчик
  public subscriber!: Subscription;

  ngOnDestroy(): void {
    //нет подписчиков выходим из хука
    if (!this.subscribers?.length) return;
    //отписываемся от всех стримов
    this.subscribers.forEach((el) => el.unsubscribe());
    //отписываемся от стрима
    this.subscriber.unsubscribe();
  }
}
