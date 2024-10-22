import { Injectable } from '@angular/core';
import { dataScreen, IScreen } from './data-screen';

@Injectable()
export class ScreenService {
  //Массив данных скринов
  public screens: IScreen[] = dataScreen;
  //порядковый номер активного скрина
  public screenOrder = 0;
  //получение скрина по номеру
  public getScreen(): IScreen {
    return this.screens[this.screenOrder];
  }
  //получение заголовков скринов
  public getTitleScreens(): string[] {
    return this.screens.map((screen) => screen.title);
  }
  //получение скринов по заголовку
  public getScreenFromTitle(title: string, id: number): IScreen {
    this.screenOrder = id - 1;
    return this.screens.find((screen) => screen.title === title) as IScreen;
  }
  //получение следующего скрина
  public nextScreen(): IScreen {
    //увеличение порядкового номера
    this.screenOrder += 1;
    //получение скрина
    return this.getScreen();
  }
  //получение предыдущего скрина
  public prevScreen(): IScreen {
    //уменьшение порядкового номера
    this.screenOrder -= 1;
    //получение скрина
    return this.getScreen();
  }
}
