import { Component, inject, TemplateRef, ViewChild } from '@angular/core';

import { RouterLink } from '@angular/router';

import { NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';
import { SidebarComponent } from '../../custom/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { SelectComponent } from '../../custom/select/select.component';
import { MenuService } from '../../../data/menu/menu.service';
import { IOptions } from '../../../data/menu/data-menu';

@Component({
  selector: 'app-setting-testing',
  styleUrl: '../settings.component.scss',
  templateUrl: 'setting-testing.component.html',
  imports: [
    RouterLink,
    NgIf,
    NgForOf,
    SidebarComponent,
    NgTemplateOutlet,
    FormsModule,
    SelectComponent,
  ],
  standalone: true,
})
export class SettingTestingComponent {
  //номер активного блока тестов
  public activeBlockTests = '1';
  @ViewChild('optionRef') option!: TemplateRef<unknown>;
  public ms = inject(MenuService);

  public selectHandler(option: IOptions): void {
    this.activeBlockTests = option.title;
    this.ms.setCurrentBlockTests(this.activeBlockTests);
  }
}
