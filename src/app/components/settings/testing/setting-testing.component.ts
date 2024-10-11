import { Component, TemplateRef, ViewChild } from '@angular/core';

import { RouterLink } from '@angular/router';
import { SettingsComponent } from '../settings.component';

import { NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';
import { SidebarComponent } from '../../custom/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { SelectComponent } from '../../custom/select/select.component';

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
export class SettingTestingComponent extends SettingsComponent {
  @ViewChild('optionRef') option!: TemplateRef<unknown>;
  public selectHandler(option: number): void {
    this.activeBlockTests = option;
    this.ms.setActiveBlockTests(option);
  }
}
