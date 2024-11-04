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
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IOptions } from '../../../data/menu/data-menu';

@Component({
  selector: 'app-multi-select',
  standalone: true,
  imports: [NgForOf, FormsModule, NgIf],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.scss',
})
export class MultiSelectComponent implements OnInit {
  @ViewChild('multiselectContainer') multiselectContainer!: ElementRef;

  @Input() public dataOptions!: IOptions[];

  @Output() public selectedOptionsEmitter = new EventEmitter<IOptions[]>();

  public searchOptions!: IOptions[];
  public selectedOptions: IOptions[] = [];
  public showPanel = false;
  public allSelect = false;
  public searchField = '';

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

  public selectedOptionsHandler() {
    this.selectedOptionsEmitter.emit(this.selectedOptions);
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
  }

  public addOption(option: IOptions): void {
    if (this.selectedOptions.map((el) => el.title).includes(option.title)) {
      this.selectedOptions = this.selectedOptions.filter(
        (el) => el.title !== option.title,
      );
    } else {
      this.selectedOptions.push(option);
      this.selectedOptions = this.selectedOptions.map((option) => option);
    }
    this.selectedOptionsHandler();
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
  }

  public removeOptions() {
    this.searchOptions = this.dataOptions;
    this.selectedOptions = [];
    this.allSelect = false;
    this.searchField = '';
  }

  public checkedOption(option: string) {
    return this.selectedOptions.map((el) => el.title).includes(option);
  }
}
