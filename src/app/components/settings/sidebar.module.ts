import { NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgForOf, NgIf, NgSwitch } from '@angular/common';
import { SettingsQuestionsComponent } from './questions/setting-questions.component';
import { SettingTestingComponent } from './testing/setting-testing.component';
import { ModalComponent } from '../custom/modal/modal.component';
import { ToggleComponent } from '../custom/toggle/toggle.component';
import { SidebarComponent } from '../custom/sidebar/sidebar.component';

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
