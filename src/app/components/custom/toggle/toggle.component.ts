import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-toggle',
  standalone: true,
  templateUrl: 'toggle.component.html',
  styleUrl: 'toggle.component.scss',
  imports: [FormsModule],
})
export class ToggleComponent {
  @Input() set defaultValue(value: boolean | null) {
    if (typeof value === 'boolean') {
      this.toggleActive = value;
    }
  }
  @Input() public label!: string;
  @Input() public title!: string;
  @Input() public position = 'right';
  // @Input() defaultValue!: boolean | null;
  @Output() toggleEmitter = new EventEmitter<boolean>();

  public toggleActive = false;
  // ngOnChanges(): void {
  //   if (typeof this.defaultValue === 'boolean') {
  //     this.toggleActive = this.defaultValue;
  //   }
  // }
  public changeToggler(): void {
    this.toggleEmitter.emit(this.toggleActive);
  }
}
