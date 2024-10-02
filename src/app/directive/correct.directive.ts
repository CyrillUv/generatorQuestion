import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { IAnswer } from '../data/testing/type';

@Directive({
  selector: '[appCorrectAnswer]',
  standalone: true,
})
export class CorrectDirective {
  @Input()
  public appCorrectAnswer!: boolean;
  @Input()
  public selectAnswer!: boolean;
  @Output()
  public clickEmitter = new EventEmitter<IAnswer>();

  @HostListener('click') onClicking(): void {
    if (!this.selectAnswer && this.selectAnswer !== undefined) {
      this.setCorrectColor();
      this.clickEmitter.emit();
    }
  }

  @HostBinding('style.color')
  public color!: string;

  private setCorrectColor(): void {
    this.color = this.appCorrectAnswer ? 'green' : 'red';
  }
}
