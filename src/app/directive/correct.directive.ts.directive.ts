import {Directive, HostBinding, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appCorrectAnswer]',
  standalone: true
})
export class CorrectDirective {
  @Input()
  public appCorrectAnswer!:boolean;
  @Input()
  public newList:boolean=true;

  @HostListener("click") onClicking():void{
    if(!this.newList) return
    else {
      this.setCorrectColor();
      this.newList = false
    }
  }
  @HostBinding('style.color')
  public color!:string;

  private setCorrectColor():void {
      this.color = this.appCorrectAnswer?"green":"red";
  }
}
