import {Injectable} from "@angular/core";
import {dataScreen, IScreen} from "./dataScreen";

@Injectable()
export class ScreenService {
  public screens: IScreen[] = dataScreen;
  public screenOrder = 0;
  public existPrevScreen = false;
  public existNextScreen = true;

  public getScreen(): IScreen {
    return this.screens[this.screenOrder];
  }
  public getTitleScreens():string[]{
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
