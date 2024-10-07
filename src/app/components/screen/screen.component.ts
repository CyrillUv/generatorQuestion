import { ChangeDetectorRef, Component, HostListener } from '@angular/core';

import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ScreenService } from '../../data/screen/screen.service';
import { IScreen } from '../../data/screen/data-screen';

@Component({
  selector: 'app-screen',
  standalone: true,
  imports: [NgIf, RouterLink, NgForOf, NgOptimizedImage],
  templateUrl: './screen.component.html',
  styleUrl: './screen.component.scss',
  providers: [ScreenService],
})
export class ScreenComponent {
  public screens!: IScreen[];
  public activeScreen: IScreen | null = null;
  public titles: string[] = [];

  constructor(
    private screenService: ScreenService,
    private cdRef: ChangeDetectorRef,
  ) {
    this.activeScreen = this.screenService.getScreen();
    this.titles = this.screenService.getTitleScreens();
    this.screens = this.screenService.screens;
  }
  @HostListener('window:keydown', ['$event']) handleKeyDown(
    event: KeyboardEvent,
  ) {
    const nextKeys = ['ArrowRight', 'ArrowDown'];
    const prevKeys = ['ArrowLeft', 'ArrowUp'];
    if (
      this.activeScreen !== this.screens[this.screens.length - 1] &&
      nextKeys.includes(event.key)
    ) {
      this.nextScreen();
    }
    if (this.activeScreen !== this.screens[0] && prevKeys.includes(event.key)) {
      this.prevScreen();
    }
  }
  public prevScreen() {
    this.cdRef.detectChanges();
    this.activeScreen = this.screenService.prevScreen();
  }
  public getScreenFromTitle(title: string, id: number): void {
    this.activeScreen = this.screenService.getScreenFromTitle(title, id);
  }

  public nextScreen() {
    this.cdRef.detectChanges();
    this.activeScreen = this.screenService.nextScreen();
  }
}
