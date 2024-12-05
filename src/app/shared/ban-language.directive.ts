import {
  Directive,
  HostListener,
  ElementRef,
  Input,
  OnChanges,
} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appBanLanguageInputText]',
})
export class BanLanguageDirective implements OnChanges {
  @Input('appBanLanguageInputText') public language!: 'rus' | 'eng' | '';

  constructor(private el: ElementRef) {

  }

  ngOnChanges(): void {
    if (!this.language) {
      this.language = 'rus';
    }
  }

  @HostListener('input', ['$event'])
  onInput(): void {
    const input = this.el.nativeElement as HTMLInputElement;
    const value = input.value;

    let filteredValue: string;
    console.log(this.language);
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
