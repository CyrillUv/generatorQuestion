import {Injectable} from "@angular/core";
import {dataScreen, IScreen} from "./dataScreen";

@Injectable()
export class ScreenService {
  public screens: Array<IScreen> = dataScreen;
  public screenOrder: number = 0;
  public existPrevScreen: boolean = false;
  public existNextScreen: boolean = true;

  public getScreen(): IScreen {
    return this.screens[this.screenOrder];
  }
  public getTitleScreens():Array<string>{
    return this.screens.map(screen => screen.title);
  }
  public getScreenFromTitle(title:string):IScreen{

    console.log(this.screenOrder)

    return (this.screens.find(screen=> screen.title===title) as IScreen)
  }
  public nextScreen(): IScreen {
   this.existPrevScreen = true;
    this.screenOrder += 1;
    if(this.screens.length-1===this.screenOrder){
      this.existNextScreen=false
    }
    return this.getScreen();
  }

  public prevScreen(): IScreen {
    this.existNextScreen=true
    this.screenOrder -= 1;
    if(this.screenOrder===0){
      this.existPrevScreen = false;
    }
    return this.getScreen();
  }
}
