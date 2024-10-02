import { ChangeDetectorRef, Component } from '@angular/core';
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
  public screens!: IScreen[];
  public screen: IScreen | null = null;
  public titles: string[] = [];

  constructor(
    private screenService: ScreenService,
    private cdRef: ChangeDetectorRef,
  ) {
    this.screen = this.screenService.getScreen();
    this.titles = this.screenService.getTitleScreens();
    this.screens = this.screenService.screens;
  }

  public prevScreen() {
    this.cdRef.detectChanges();
    this.screen = this.screenService.prevScreen();
  }
  public getScreenFromTitle(title: string, id: number): void {
    this.screen = this.screenService.getScreenFromTitle(title, id);
  }

  public nextScreen() {
    this.cdRef.detectChanges();
    this.screen = this.screenService.nextScreen();
  }
}
