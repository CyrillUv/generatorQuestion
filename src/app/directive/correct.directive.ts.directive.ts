import {Directive, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';

@Directive({
  selector: '[appCorrectAnswer]',
  standalone: true
})
export class CorrectDirective {
  @Input()
  public appCorrectAnswer!:boolean;@Input()
  public selectAnswer!:boolean ;
  @Output()
  public onClick:EventEmitter<any> = new EventEmitter();
  @HostListener("click") onClicking():void{
    if(!this.selectAnswer && this.selectAnswer !== undefined) {
      console.log('select', this.selectAnswer)
      this.setCorrectColor();
      this.onClick.emit();
    }
  }
  @HostBinding('style.color')
  public color!:string;

  private setCorrectColor():void {
      this.color = this.appCorrectAnswer?"green":"red";
  }
}
