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
  //Флаг активности тогла
  @Input() set valueToggle(value: boolean | null) {
    //если значение типа булеан,присваивает его локальной переменной
    if (typeof value === 'boolean') {
      this.toggleActive = value;
    }
  }
  //Надпись
  @Input() public label!: string;
  //Описание
  @Input() public title!: string;
  //позиция тогла
  @Input() public position = 'right';
  //состояние тогла в родителе
  @Output() toggleEmitter = new EventEmitter<boolean>();
  //состояние тогла в локале
  public toggleActive = false;
  //Изменение состояния тогла
  public changeToggler(): void {
    this.toggleEmitter.emit(this.toggleActive);
  }
}
