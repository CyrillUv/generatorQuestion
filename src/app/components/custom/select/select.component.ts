import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { IOptions } from '../../../data/menu/data-menu';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements OnInit, ControlValueAccessor {
  @ViewChild('selectContainer') selectContainer!: ElementRef;
  //получение настроек
  @Input() public data!: IOptions[];
  //активный блок задач
  @Input() public defaultInvalid!: boolean;

  //выбранный блок тестов
  @Output() public selectedItemEmitter = new EventEmitter<IOptions>();

  // Переменная для хранения выбранного option
  public searchData!: IOptions[];
  public showPanel = false;
  public searchField = '';
  public activeItem: IOptions | null = null;

  public invalidField!: boolean;
  public writeValue(value: IOptions): void {
    this.activeItem = value;
    this.invalidField = !!value;
  }
  public registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  public onTouched!: () => void;
  public onChange!: (value: IOptions) => void;
  ngOnInit(): void {
    this.searchData = this.data;
  }
  // ngOnChanges() {
  //   if (this.defaultItem) {
  //     this.activeItem = this.data.find((el) =>
  //       el.title.includes(this.defaultItem),
  //     ) as IOptions;
  //   }
  // }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // Закрывает список, если клик был за пределами input и dropdown-list
    const target = event.target as HTMLElement;
    const container = this.selectContainer.nativeElement;
    // Проверяем, кликнули ли на dropdown или его элементы
    if (!container.contains(target)) {
      this.showPanel = false;
    }
  }

  public showHidePanel(): void {
    this.showPanel = !this.showPanel;
  }

  public filterOptions() {
    if (!this.searchField) {
      this.searchData = this.data;
      return;
    }

    this.data.filter(
      (el) =>
        el.title.toLowerCase().indexOf(this.searchField.toLowerCase().trim()) >
        -1,
    );
  }

  public removeOptions() {
    this.searchData = this.data;
    this.searchField = '';
  }

  public selectOption(option: IOptions) {
    this.activeItem = option;
    this.onChange(this.activeItem);
    this.onTouched();
    this.invalidField = !!this.activeItem;
  }
}
