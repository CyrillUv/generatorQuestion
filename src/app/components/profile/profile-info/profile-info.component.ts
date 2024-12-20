import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {ProfileStateService} from "../services/profile-state.service";

@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './profile-info.component.html',
  styleUrl: '../profile.component.scss',
})
export class ProfileInfoComponent {
  public imageSrc: string | ArrayBuffer | null = null;
  constructor(public profileService:ProfileStateService) {
  this.imageSrc = profileService.getProfileIcon()?.src
  }
}
