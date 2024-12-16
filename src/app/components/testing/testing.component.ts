import { Component } from '@angular/core';
import { PanelTestingComponent } from './panel-testing';

@Component({
  selector: 'app-testing',
  template: '<app-panel-testing/>',
  standalone: true,
  imports: [PanelTestingComponent],
})
export class TestingComponent {}
