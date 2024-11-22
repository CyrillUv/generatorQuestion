import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LoaderService } from './loader.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent implements OnInit {
  constructor(public loaderService: LoaderService) {}

  ngOnInit(): void {
    this.loaderService.isLoading$.subscribe((res) => {
      if (res) {
        //стили для отключения событий других компонентов
        document.body.classList.add('event-none');
        document.body.classList.add('component-opacity');
      } else {
        //удаление отключения событий
        document.body.classList.remove('event-none');
        document.body.classList.remove('component-opacity');
      }
    });
  }
}
