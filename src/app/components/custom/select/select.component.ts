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
  @Input() public activeBlockTests!: number;
  @Output() public selectedBlockTestsEmitter = new EventEmitter<number>();
  @Input() public dataMenu!: IDataMenu[];
  public selectedOption = 1; // Переменная для хранения выбранного option
  constructor(public ms: MenuService) {}

  ngOnInit(): void {
    this.dataMenu = this.ms.getData();
  }
  public testsHandler() {
    this.selectedBlockTestsEmitter.emit(this.selectedOption);
  }
}
