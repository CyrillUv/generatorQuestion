import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { IDataMenu } from '../../../data/menu/data-menu';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent implements OnInit {
  @ViewChild('selectContainer') selectContainer!: ElementRef;
  //активный блок задач
  @Input() public activeBlock!: string;
  //получение настроек
  @Input() data!: IDataMenu;
  //выбранный блок тестов
  @Output() public selectedBlockTestsEmitter = new EventEmitter<string>();
  //Выбранная опция
  // Переменная для хранения выбранного option
  public searchOptions!: IDataMenu;
  public activeSelect = false;
  public searchField = '';
  ngOnInit(): void {
    this.searchOptions = this.data;
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // Закрывает список, если клик был за пределами input и dropdown-list
    const target = event.target as HTMLElement;
    const container = this.selectContainer.nativeElement;
    // Проверяем, кликнули ли на dropdown или его элементы
    if (!container.contains(target)) {
      this.activeSelect = false;
    }
  }

  public changeSelect(): void {
    this.activeSelect = !this.activeSelect;
  }

  public filterOptions() {
    if (!this.searchField) {
      this.searchOptions = this.data;
      return;
    }

    this.data.options.filter(
      (el) =>
        el.option.toLowerCase().indexOf(this.searchField.toLowerCase().trim()) >
        -1,
    );
  }

  //Обработчик тестов
  public testsHandler() {
    this.selectedBlockTestsEmitter.emit(this.activeBlock);
  }

  public removeOptions() {
    this.searchOptions = this.data;
    this.searchField = '';
  }

  public selectOption(option: string) {
    this.activeBlock = option;
    this.testsHandler();
  }
}
