import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AsyncPipe, NgOptimizedImage} from "@angular/common";
import {ProfileStateService} from "../services/profile-state.service";

@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [NgOptimizedImage, AsyncPipe],
  templateUrl: './profile-info.component.html',
  styleUrl: '../profile.component.scss',
})
export class ProfileInfoComponent{
  constructor(public profileService: ProfileStateService) {
  }

}
