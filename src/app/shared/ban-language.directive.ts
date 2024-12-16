import { Directive,ElementRef, Input, OnInit } from '@angular/core';
import { debounceTime, fromEvent } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';

@Directive({
  selector: '[appBanLanguageInputText]',
  standalone:true
})
export class BanLanguageDirective implements OnInit {
  @Input('appBanLanguageInputText') language: 'rus' | 'eng' | 'default' = 'rus';
  @Input() delay = 500; // Задержка по умолчанию

  private subscription!: Subscription;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    console.log(this.delay)
    this.subscription = fromEvent<KeyboardEvent>(this.el.nativeElement, 'input')
      .pipe(debounceTime(this.delay as number))
      .subscribe((event: Event) => {
        this.onInput(event);
      });
  }

  private onInput(event: Event): void {
      const input = this.el.nativeElement as HTMLInputElement;
      const value = input.value;

      let filteredValue: string;

      if (this.language === 'eng') {
        // Удаляем английские символы
        filteredValue = value.replace(/[a-zA-Z]/g, '');
      } else if (this.language === 'rus') {
        // Удаляем русские символы
        filteredValue = value.replace(/[а-яА-Я]/g, '');
      } else {
        return; // Если язык не указан, ничего не делаем
      }

      // Обновляем значение input только если оно изменилось
      if (filteredValue !== value) {
        input.value = filteredValue;
        // Триггерим событие input, чтобы другие обработчики могли узнать о изменении
        input.dispatchEvent(new Event('input'));
      }
  }
}
