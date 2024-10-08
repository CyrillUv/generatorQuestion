import { Component } from '@angular/core';
import { PanelTestingComponent } from './panel-testing/panel-testing.component';

@Component({
  selector: 'app-testing',
  template: '<app-panel-testing/>',
  standalone: true,
  imports: [PanelTestingComponent],
})
export class TestingComponent {}
