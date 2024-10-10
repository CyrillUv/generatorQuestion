import { RouterLink } from '@angular/router';

import { SettingsComponent } from '../settings.component';
import { Component } from '@angular/core';

import { NgForOf, NgIf } from '@angular/common';
import { ToggleComponent } from '../../custom/toggle/toggle.component';
import { SidebarComponent } from '../../custom/sidebar/sidebar.component';

@Component({
  selector: 'app-setting-questions',
  templateUrl: 'setting-questions.component.html',
  styleUrl: '../settings.component.scss',
  standalone: true,
  imports: [RouterLink, ToggleComponent, NgForOf, NgIf, SidebarComponent],
})
export class SettingsQuestionsComponent extends SettingsComponent {}
