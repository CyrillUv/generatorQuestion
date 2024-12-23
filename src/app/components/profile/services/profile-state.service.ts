import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProfile } from '../../auth';

export interface IIcon {
  id: number;
  src: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileStateService {
  public profile$ = new BehaviorSubject<IProfile|null>(null);
  private iconSelection = false;
  private profileIcon!: IIcon;

  public getIconSelection(): boolean {
    return this.iconSelection;
  }

  public getProfileIcon(): IIcon {
    return this.profileIcon;
  }

  public setIconSelection(value: boolean): void {
    this.iconSelection = value;
  }

  public setProfileIcon(value: IIcon): void {
    console.log(value)
    this.profileIcon = value;
  }
}
