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
    'Опция 1',
    'Опция 2',
    'Опция 3',
    'Опция 4',
    'Опция 5',
    'Опция 6',
    'Опция 7',
    'Опция 8',
  ];
  public selectedOptions: string[] = [];
  public activeSelect = false;

  public openSelect(): void {
    this.activeSelect = !this.activeSelect;
  }

  public addOption(option: string): void {
    if (this.selectedOptions.includes(option)) {
      this.selectedOptions = this.selectedOptions.filter((el) => el !== option);
    } else {
      this.selectedOptions.push(option);
      this.selectedOptions = this.selectedOptions.map((option) => option);
    }
  }
}
