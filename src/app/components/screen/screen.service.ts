import { Injectable } from '@angular/core';
import { dataScreen, IScreen } from './data-screen';

@Injectable()
export class ScreenService {
  public screens: IScreen[] = dataScreen;
  public screenOrder = 0;

  public getScreen(): IScreen {
    return this.screens[this.screenOrder];
  }
  public getTitleScreens(): string[] {
    return this.screens.map((screen) => screen.title);
  }
  public getScreenFromTitle(title: string, id: number): IScreen {
    console.log(this.screenOrder);
    this.screenOrder = id - 1;
    return this.screens.find((screen) => screen.title === title) as IScreen;
  }
  public nextScreen(): IScreen {
    this.screenOrder += 1;
    return this.getScreen();
  }

  public prevScreen(): IScreen {
    this.screenOrder -= 1;
    return this.getScreen();
  }
}
