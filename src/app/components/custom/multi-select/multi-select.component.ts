import { Component } from '@angular/core';
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
  public options: string[] = [
    'Опsadasdastyffsayuhjcnikzxlmvlkdszvsdfasl;kndfhbytgyuajp;adsvkmjnhzxcция8',
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

  public openSelect(): void {
    this.activeSelect = !this.activeSelect;
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
}
