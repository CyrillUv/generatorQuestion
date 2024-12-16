import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { IAnswer } from '../data';

@Directive({
  selector: '[appCorrectAnswer]',
  standalone: true,
})
export class CorrectDirective {
  //принимает правильный ответ
  @Input()
  public appCorrectAnswer!: boolean;
  //выбранный ответ
  @Input()
  public selectAnswer!: boolean;
  //ловит ответ
  @Output()
  public clickEmitter = new EventEmitter<IAnswer>();

  //событие отрабатывает на клик по элементу куда добавлен пайп
  @HostListener('click') onClicking(): void {
    //если ответ выбран окрашиваем компонент
    if (!this.selectAnswer && this.selectAnswer !== undefined) {
      //от правильности ответа зависит цвет окрашивания
      this.setCorrectColor();
      //отлавливает ответ
      this.clickEmitter.emit();
    }
  }
  //переменная прикреплена к свойству color,куда отправляется данный пайп
  @HostBinding('style.color')
  public color!: string;
  //изменение цвета в зависимости от правильности ответа
  private setCorrectColor(): void {
    this.color = this.appCorrectAnswer ? 'green' : 'red';
  }
}
