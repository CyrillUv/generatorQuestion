import { Component } from '@angular/core';
import { ProfileIconComponent } from './profile-icon.component';
import { NgForOf } from '@angular/common';
import { IIcon, ProfileStateService } from '../services/profile-state.service';
import {ApiProfileService} from "../services/api-profile.service";

@Component({
  selector: 'app-profile-icons',
  templateUrl: './profile-icons.component.html',
  styleUrl: '../profile.component.scss',
  imports: [ProfileIconComponent, NgForOf],
  standalone: true,
})
export class ProfileIconsComponent {
  public selectedIcon!: IIcon;
  public icons: IIcon[] = [
    // { id: 1, src: 'setter.png', activeIcon: false },
    // { id: 2, src: 'screen.png', activeIcon: false },
    // { id: 3, src: 'pipe.png', activeIcon: false },
    // { id: 4, src: 'subscribers.png', activeIcon: false },
    // { id: 5, src: 'subscribers2.png', activeIcon: false },
    // { id: 6, src: 'takeUntil.png', activeIcon: false },
    // { id: 7, src: 'takeUntil2.png', activeIcon: false },
    // { id: 8, src: 'lifeCycle2.png', activeIcon: false },
    // { id: 9, src: 'canActivate.png', activeIcon: false },
    // { id: 10, src: 'avatar.png', activeIcon: false },
  ];

  constructor(public profileService:ApiProfileService) {}


}
