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
import { IOptions } from '../../../data';
//В данном компоненте используется  NG_VALUE_ACCESSOR для изменения состояний в формах(FormGroup&ngModel)
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
  //Данные массива опций
  @Input() public dataOptions!: IOptions[];
  //Эмит выбранных опций наверх
  @Output() public selectedOptionsEmitter = new EventEmitter<IOptions[]>();
  //Найденные во время поиска опции
  public searchOptions!: IOptions[];
  //Выбранные опции
  public selectedOptions!: IOptions[];
  //Выдвижение панели опций
  public showPanel = false;
  //Выбор всех опций
  public allSelect = false;
  //Поле поиска
  public searchField = '';
  //Валидность поля
  public invalidField!: boolean;
  //Метод ControlValueAccessor
  private onTouched!: () => void;

  ngOnInit(): void {
    //Дефолтное значение опций в панели
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
  //Метод ControlValueAccessor
  public writeValue(value: IOptions[]): void {
    //Изменение выбранных опций
    this.selectedOptions = value;
    //проверка поля на валидность
    this.invalidField = !value?.length;
  }
  //Метод ControlValueAccessor
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  //Метод ControlValueAccessor
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

  public openCloseSelect(): void {
    //открытие/закрытие панели
    this.showPanel = !this.showPanel;
  }

  public closeSelect(): void {
    //закрытие панели
    this.showPanel = false;
  }

  public allOptions(): void {
    //переключение селекта
    this.allSelect = !this.allSelect;
    //если тру выбирает все селекты
    if (this.allSelect) {
      this.selectedOptions = this.searchOptions;
    }
    //иначе их отменяет
    else {
      this.selectedOptions = [];
    }
    //проверка на валидность
    this.selectedOptionsHandler();
  }

  public addOption(option: IOptions): void {
    //если выбранные опции есть и есть схожий с входящим,то удаляем его
    if (
      this.selectedOptions &&
      this.selectedOptions.map((el) => el.title).includes(option.title)
    ) {
      this.selectedOptions = this.selectedOptions.filter(
        (el) => el.title !== option.title,
      );
      this.selectedOptionsHandler();
    } else {
      // иначе
      //если есть выбранные опции ,добавляем его в этот массив
      if (this.selectedOptions) {
        this.selectedOptions = this.selectedOptions.map((option) => option);
        this.selectedOptions.push(option);
      } else {
        //иначе , т.к. выбранных нет принимаем пустой массив
        this.selectedOptions = [];
      }
      //проверка на валидность
      this.selectedOptionsHandler();
    }
  }
  //фильтрация для поиска опций
  public filterOptions() {
    //если поле ввода пустое,получаем дефолтные данные и выходим из метода
    if (!this.searchField) {
      this.searchOptions = this.dataOptions;
      return;
    }
    //находим посимвольно идентичные опции
    this.searchOptions = this.dataOptions.filter(
      (el) =>
        el.title.toLowerCase().indexOf(this.searchField.toLowerCase().trim()) >
        -1,
    );
    //проверка на валидность
    this.selectedOptionsHandler();
  }
  //удаление всех опций из поля выбранных
  public removeOptions() {
    //дефолт значение опций
    this.searchOptions = this.dataOptions;
    //зануление выбранных опций
    this.selectedOptions = [];
    //выключение опции (возможно были случаи когда можно включить все и удалить,а потом чекбокс активен)
    this.allSelect = false;
    //проверка на валидность
    this.selectedOptionsHandler();
  }
  //Выбор опции
  public checkedOption(option: string): boolean | undefined | void {
    if (this.selectedOptions?.length) {
      return this.selectedOptions.map((el) => el.title).includes(option);
    }
  }
  //опбнуление поля поиска
  public clearSearch() {
    this.searchOptions = this.dataOptions;
    this.searchField = '';
  }
}
