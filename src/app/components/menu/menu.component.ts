import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';

import { MenuService } from '../../data/menu/menu.service';

import { test } from './menu.animations';
import { SidebarModule } from '../settings/sidebar.module';
import { SettingsQuestionsComponent } from '../settings/questions/setting-questions.component';
import { SettingTestingComponent } from '../settings/testing/setting-testing.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    NgIf,
    NgForOf,
    SidebarModule,
    SettingsQuestionsComponent,
    SettingTestingComponent,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  animations: [test],
})
export class MenuComponent {
  constructor(public ms: MenuService) {}

  public changeRoute(route: '/questions' | '/testing') {
    this.ms.setRoute(route);
    this.ms.setSettingMode(true);
  }
}
