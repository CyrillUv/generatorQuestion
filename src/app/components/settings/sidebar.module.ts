import { NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgForOf, NgIf, NgSwitch } from '@angular/common';
import { SettingsQuestionsComponent } from './questions';
import { SettingTestingComponent } from './testing';
import { ModalComponent, SidebarComponent, ToggleComponent } from '../custom';

@NgModule({
  declarations: [],
  imports: [
    RouterLink,
    NgForOf,
    NgIf,
    NgSwitch,
    ToggleComponent,
    SettingsQuestionsComponent,
    SettingTestingComponent,
    ModalComponent,
    SidebarComponent,
  ],
  exports: [],
})
export class SidebarModule {}
