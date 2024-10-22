import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { MenuService } from '../../../data/menu/menu.service';
import { IDataMenu } from '../../../data/menu/data-menu';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [FormsModule, NgForOf],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent implements OnInit {
  //активный блок тестов
  @Input() public activeBlockTests!: number;
  //получение настроек
  @Input() public dataMenu!: IDataMenu[];
  //выбранный блок тестов
  @Output() public selectedBlockTestsEmitter = new EventEmitter<number>();
  //Выбранная опция
  public selectedOption = 1; // Переменная для хранения выбранного option
  constructor(public ms: MenuService) {}

  ngOnInit(): void {
    //Присваивание переменной данных настроек
    this.dataMenu = this.ms.getData();
  }
  //Обработчик тестов
  public testsHandler() {
    this.selectedBlockTestsEmitter.emit(this.selectedOption);
  }
}
