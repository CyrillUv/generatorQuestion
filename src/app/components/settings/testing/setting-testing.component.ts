import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';
import { SettingsComponent } from '../settings.component';

import { NgForOf, NgIf } from '@angular/common';
import { SidebarComponent } from '../../custom/sidebar/sidebar.component';

@Component({
  selector: 'app-setting-testing',
  styleUrl: '../settings.component.scss',
  templateUrl: 'setting-testing.component.html',
  imports: [RouterLink, NgIf, NgForOf, SidebarComponent],
  standalone: true,
})
export class SettingTestingComponent extends SettingsComponent {}
