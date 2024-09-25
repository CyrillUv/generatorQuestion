import {Directive, HostBinding, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appCorrectAnswer]',
  standalone: true
})
export class CorrectDirectiveDirective {
  @Input()
  public appCorrectAnswer!: boolean;
  @Input()
  public newList!: boolean;

  @HostListener("click") onClicking(): void {
    if (!this.newList) {
      return
    } else {

      this.newList = false
      this.setCorrectColor();

      console.log(this.newList)
    }
  }

  @HostBinding('style.color') public color!: string;

  private setCorrectColor(): void {
    this.color = this.appCorrectAnswer ? "green" : "red";
  }
}
