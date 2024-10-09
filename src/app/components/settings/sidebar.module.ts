import { NgModule } from '@angular/core';
import { SettingsComponent } from './settings.component';
import { RouterLink } from '@angular/router';
import { NgForOf, NgIf, NgSwitch } from '@angular/common';
import { ToggleComponent } from '../custom/toggle.component';

@NgModule({
  declarations: [SettingsComponent],
  imports: [RouterLink, NgForOf, NgIf, NgSwitch, ToggleComponent],
  exports: [SettingsComponent],
})
export class SidebarModule {}
