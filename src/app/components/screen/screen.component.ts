import { Component } from '@angular/core';
import {IScreen} from "./dataScreen";
import {ScreenService} from "./screen.service";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {IData, IQuestion, NameDataType} from "../../data/type";

@Component({
  selector: 'app-screen',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    NgForOf
  ],
  templateUrl: './screen.component.html',
  styleUrl: './screen.component.css',
  providers: [ScreenService]
})
export class ScreenComponent {
  public screen:IScreen|null = null;
  public titles:Array<string>=[]
  get existPrevScreen():boolean{
    return this.screenService.existPrevScreen;
  }
  get existNextScreen():boolean{
    return this.screenService.existNextScreen;
  }

  constructor(private screenService:ScreenService) {
    this.screen=this.screenService.getScreen();
    this.titles=this.screenService.getTitleScreens()
  }

  public prevScreen() {
    this.screen=this.screenService.prevScreen();
  }
  public getScreenFromTitle(title:string):void{
    this.screen = this.screenService.getScreenFromTitle(title)
  }

  public nextScreen() {
    this.screen=this.screenService.nextScreen();

  }
}
