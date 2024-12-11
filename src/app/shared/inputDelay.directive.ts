
// // import {Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit} from "@angular/core";
// // import {
// //   debounceTime,
// //   fromEvent,
// //   Subscription, switchMap, tap, timer,
// // } from 'rxjs';
// // import {BanLanguageDirective} from "./ban-language.directive";
// //
// // @Directive({
// //   selector: '[appInputDelay]',
// //   standalone:true
// // })
// //   export class InputDelayDirective implements OnInit, OnChanges, OnDestroy {
// //   @Input('appInputDelay') ms!: number|'';
// //   private eventSubscription!: Subscription;
// // // Ссылка на блокирующую директиву
// //   @Input() banLanguage!: BanLanguageDirective;
// //   ngOnInit(): void {
// //     this.ms = 5000
// //   }
// //   // Ссылка на блокирующую директиву
// //   constructor(private el: ElementRef) {}
// //
// //   ngOnChanges(): void {
// //     if (this.eventSubscription) {
// //       this.eventSubscription.unsubscribe(); // Отписка от предыдущей подписки
// //     }
// //
// //     // Блокируем действия другой директивы и ждем задержку
// //     if (this.banLanguage) {
// //       this.banLanguage.setBlock(true); // Блокируем
// //     }
// //
// //     this.eventSubscription = fromEvent<KeyboardEvent>(this.el.nativeElement, 'input')
// //       .pipe(
// //         debounceTime(this.ms as number),
// //         tap((event: Event) => {
// //           const value = (event.target as HTMLInputElement).value;
// //           console.log('Сработал ввод: ', value); // Логируем значение
// //         }),
// //         switchMap(() => {
// //           // После задержки разблокируем
// //           if (this.banLanguage) {
// //             this.banLanguage.setBlock(false);
// //           }
// //           return timer(0); // Здесь просто ждем завершения
// //         })
// //       )
// //       .subscribe();
// //   }
// //
// //   ngOnDestroy(): void {
// //     if (this.eventSubscription) {
// //       this.eventSubscription.unsubscribe(); // Отписка при уничтожении
// //     }
// //   }
// // }
