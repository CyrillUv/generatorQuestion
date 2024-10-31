import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-multi-select',
  standalone: true,
  imports: [NgForOf, FormsModule, NgIf],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.scss',
})
export class MultiSelectComponent {
  @ViewChild('multiselectContainer') multiselectContainer!: ElementRef;

  public options: string[] = [
    'Опция 1',
    'Опция 242',
    'Опция 3',
    'Опция 45',
    'Опция 57',
    'Опция 6',
    'Опция 7',
    'Опция 8',
  ];
  public searchOptions: string[] = this.options;
  public selectedOptions: string[] = [];
  public activeSelect = false;
  public allSelect = false;
  public searchField = '';

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
  public changeSelect(): void {
    this.activeSelect = !this.activeSelect;
  }
  public closeSelect(): void {
    this.activeSelect = false;
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

  public addOption(option: string): void {
    console.log(this.selectedOptions);
    if (this.selectedOptions.includes(option)) {
      this.selectedOptions = this.selectedOptions.filter((el) => el !== option);
    } else {
      this.selectedOptions.push(option);
      this.selectedOptions = this.selectedOptions.map((option) => option);
    }
  }

  public filterOptions() {
    if (!this.searchField) {
      this.searchOptions = this.options;
      return;
    }
    this.searchOptions = this.options.filter(
      (el) =>
        el.toLowerCase().indexOf(this.searchField.toLowerCase().trim()) > -1,
    );
  }

  public removeOptions() {
    this.searchOptions = this.options;
    this.selectedOptions = [];
    this.allSelect = false;
    this.searchField = '';
  }

  protected readonly event = event;
}
