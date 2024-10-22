import { Component, inject, TemplateRef, ViewChild } from '@angular/core';

import { RouterLink } from '@angular/router';

import { NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';
import { SidebarComponent } from '../../custom/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { SelectComponent } from '../../custom/select/select.component';
import { MenuService } from '../../../data/menu/menu.service';

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
  public activeBlockTests = 1;
  @ViewChild('optionRef') option!: TemplateRef<unknown>;
  public ms = inject(MenuService);

  public selectHandler(option: number): void {
    this.activeBlockTests = option;
    this.ms.setCurrentBlockTests(option);
  }
}
