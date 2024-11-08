import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { IOptions } from '../../../data/menu/data-menu';

@Component({
  selector: 'app-multi-select',
  standalone: true,
  imports: [NgForOf, FormsModule, NgIf],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectComponent),
      multi: true,
    },
  ],
})
export class MultiSelectComponent implements OnInit, ControlValueAccessor {
  @ViewChild('multiselectContainer') multiselectContainer!: ElementRef;

  @Input() public dataOptions!: IOptions[];

  @Output() public selectedOptionsEmitter = new EventEmitter<IOptions[]>();
  public searchOptions!: IOptions[];
  public selectedOptions!: IOptions[];
  public showPanel = false;
  public allSelect = false;
  public searchField = '';
  public invalidField!: boolean;
  private onTouched!: () => void;

  ngOnInit(): void {
    this.searchOptions = this.dataOptions;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // Закрывает список, если клик был за пределами input и dropdown-list
    const target = event.target as HTMLElement;
    const container = this.multiselectContainer.nativeElement;
    // Проверяем, кликнули ли на dropdown или его элементы
    if (!container.contains(target)) {
      this.closeSelect();
    }
  }

  // Функция, вызываемая при изменении значения
  public onChange!: (value: IOptions[]) => void;

  public writeValue(value: IOptions[]): void {
    this.selectedOptions = value;
    this.invalidField = !value?.length;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  public selectedOptionsHandler() {
    //эмитер для работы без формгруппы и ngmodel
    // this.selectedOptionsEmitter.emit(this.selectedOptions);
    this.onChange(this.selectedOptions);
    this.invalidField = !this.selectedOptions?.length;
    this.onTouched();
  }

  public changeSelect(): void {
    this.showPanel = !this.showPanel;
  }

  public closeSelect(): void {
    this.showPanel = false;
  }

  public allOptions(): void {
    this.allSelect = !this.allSelect;
    if (this.allSelect) {
      this.selectedOptions = this.searchOptions;
    }
    if (!this.allSelect) {
      this.selectedOptions = [];
    }
    this.selectedOptionsHandler();
  }

  public addOption(option: IOptions): void {
    if (
      this.selectedOptions &&
      this.selectedOptions.map((el) => el.title).includes(option.title)
    ) {
      this.selectedOptions = this.selectedOptions.filter(
        (el) => el.title !== option.title,
      );
      this.selectedOptionsHandler();
    } else {
      if (this.selectedOptions) {
        this.selectedOptions = this.selectedOptions.map((option) => option);
        this.selectedOptions.push(option);
      } else {
        this.selectedOptions = [];
      }
      this.selectedOptionsHandler();
    }
  }

  public filterOptions() {
    if (!this.searchField) {
      this.searchOptions = this.dataOptions;
      return;
    }
    this.searchOptions = this.dataOptions.filter(
      (el) =>
        el.title.toLowerCase().indexOf(this.searchField.toLowerCase().trim()) >
        -1,
    );
    this.selectedOptionsHandler();
  }

  public removeOptions() {
    this.searchOptions = this.dataOptions;
    this.selectedOptions = [];
    this.allSelect = false;
    this.selectedOptionsHandler();
  }

  public checkedOption(option: string): boolean | undefined | void {
    if (this.selectedOptions?.length) {
      return this.selectedOptions.map((el) => el.title).includes(option);
    }
  }
}
