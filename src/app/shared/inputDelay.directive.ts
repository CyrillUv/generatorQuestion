import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {debounceTime, fromEvent, of} from "rxjs";

@Directive({
  selector: '[appInputDelay]',
  standalone: true,
})
export class InputDelayDirective implements OnInit{
  @Input() appInputDelay = 5000;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.delay();
  }

  public delay(): void {
    fromEvent<KeyboardEvent>(this.el.nativeElement, 'input')
      .pipe(debounceTime(this.appInputDelay as number))
      .subscribe((event: Event) => {
        console.log('2222', event)
        // this.onInput(event);
      });
  }
}
