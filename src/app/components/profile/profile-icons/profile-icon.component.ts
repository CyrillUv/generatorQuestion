import { Component, Input } from '@angular/core';
import { IIcon, ProfileStateService } from '../services/profile-state.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-profile-icon',
  standalone: true,
  templateUrl: 'profile-icon.component.html',
  imports: [AsyncPipe],
  styleUrl: '../profile.component.scss',
})
export class ProfileIconComponent {
  @Input() public icon!: IIcon;

  constructor(public profileService: ProfileStateService) {}
}
