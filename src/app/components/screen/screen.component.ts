import { ChangeDetectorRef, Component, HostListener } from '@angular/core';

import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IScreen, ScreenService } from '../../data';
import { LoaderService } from '../custom';

@Component({
  selector: 'app-screen',
  standalone: true,
  imports: [NgIf, RouterLink, NgForOf, NgOptimizedImage],
  templateUrl: './screen.component.html',
  styleUrl: './screen.component.scss',
  providers: [ScreenService],
})
export class ScreenComponent {
  //Массив всех скрины
  public screens!: IScreen[];
  //активный скрин
  public activeScreen: IScreen | null = null;
  //массив названий скринов
  public titles: string[] = [];

  constructor(
    private screenService: ScreenService,
    private cdRef: ChangeDetectorRef,
    private _loader: LoaderService,
  ) {
    //Получение первого скрина из сервиса,задание его по умолчанию
    this.activeScreen = this.screenService.getScreen();
    //Формирование всех названий скринов
    this.titles = this.screenService.getTitleScreens();
    //Вытаскивание всех скринов в локальную переменную
    this.screens = this.screenService.screens;
  }
  //Механизм перехода по скринам,с помощью стрелок клавиатуры
  //Реагирует на нажатие клавиши,ловит событии и отрабатывает метод
  @HostListener('window:keydown', ['$event']) handleKeyDown(
    event: KeyboardEvent,
  ) {
    //название ключей клавиш для перехода к следующим скринам
    const nextKeys = ['ArrowRight', 'ArrowDown'];
    //название ключей клавиш для перехода к прошлым скринам
    const prevKeys = ['ArrowLeft', 'ArrowUp'];
    //если текущий скрин не последний и
    if (
      this.activeScreen !== this.screens[this.screens.length - 1] &&
      //ключ события есть в массиве для перехода к следующим скринам,
      nextKeys.includes(event.key)
    ) {
      // то показывай следующий скрин
      this.nextScreen();
    }
    //если текущий скрин не первый и
    if (
      this.activeScreen !== this.screens[0] &&
      //ключ события есть в массиве для перехода к прошлым скринам,
      prevKeys.includes(event.key)
    ) {
      // то показывай предыдущий скрин
      this.prevScreen();
    }
  }
  //Получение предыдущего скрина
  public prevScreen() {
    //Фиксирование изменений
    this.cdRef.detectChanges();
    //Получение предыдущего скрина
    this.activeScreen = this.screenService.prevScreen();
  }
  //Получение скрина по заголовку
  public getScreenFromTitle(title: string, id: number): void {
    //выбранный скрин становится активным
    this.activeScreen = this.screenService.getScreenFromTitle(title, id);
  }

  public nextScreen() {
    //Фиксирование изменений
    this.cdRef.detectChanges();
    //Получение следующего скрина
    this.activeScreen = this.screenService.nextScreen();
  }
}
