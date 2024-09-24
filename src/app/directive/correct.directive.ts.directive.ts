import {ChangeDetectorRef, Directive, ElementRef, HostBinding, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appCorrectAnswer]',
  standalone: true
})
export class CorrectDirectiveDirective {
  @Input()
  public appCorrectAnswer!:boolean

  @HostListener("click") onClicking(){
    this.setCorrectBackground()
  }
  @HostBinding('style.color')
  public color!:string

private setCorrectBackground() {
    this.color = this.appCorrectAnswer?"green":"red"
  }
}
