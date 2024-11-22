import { Component, Input } from '@angular/core';

import { NgClass, NgIf } from '@angular/common';
import { EventType } from '@angular/router';

@Component({
  selector: 'app-loading-bar',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './loading-bar.component.html',
  styleUrl: './loading-bar.component.scss',
})
export class LoadingBarComponent {
  //Энум от которого зависит какая загрузочная планка будет изображена вверху при загрузке страницы
  @Input() public isLoading: EventType = EventType.NavigationStart;
}
