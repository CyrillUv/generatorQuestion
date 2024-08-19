import { Component } from '@angular/core';
import {IScreen} from "./dataScreen";
import {ScreenService} from "./screen.service";
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-screen',
  standalone: true,
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './screen.component.html',
  styleUrl: './screen.component.css',
  providers: [ScreenService]
})
export class ScreenComponent {
  public screen:IScreen|null = null;
  get existPrevScreen():boolean{
    return this.screenService.existPrevScreen;
  }
  get existNextScreen():boolean{
    return this.screenService.existNextScreen;
  }

  constructor(private screenService:ScreenService) {
    this.screen=this.screenService.getScreen();
  }

  public prevScreen() {
    this.screen=this.screenService.prevScreen();
  }

  public nextScreen() {
    this.screen=this.screenService.nextScreen();

  }
}
