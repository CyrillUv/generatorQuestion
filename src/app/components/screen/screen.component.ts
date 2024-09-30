import { Component } from '@angular/core';
import { IScreen } from './data-screen';
import { ScreenService } from './screen.service';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-screen',
  standalone: true,
  imports: [NgIf, RouterLink, NgForOf, NgOptimizedImage],
  templateUrl: './screen.component.html',
  styleUrl: './screen.component.scss',
  providers: [ScreenService],
})
export class ScreenComponent {
  public screen: IScreen | null = null;
  public titles: string[] = [];
  get existPrevScreen(): boolean {
    return this.screenService.existPrevScreen;
  }
  get existNextScreen(): boolean {
    return this.screenService.existNextScreen;
  }

  constructor(private screenService: ScreenService) {
    this.screen = this.screenService.getScreen();
    this.titles = this.screenService.getTitleScreens();
  }

  public prevScreen() {
    this.screen = this.screenService.prevScreen();
  }
  public getScreenFromTitle(title: string): void {
    this.screen = this.screenService.getScreenFromTitle(title);
  }

  public nextScreen() {
    this.screen = this.screenService.nextScreen();
  }
}
