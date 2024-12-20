import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { ProfileIconsComponent } from './profile-icons/profile-icons.component';
import { ProfileStateService } from './services/profile-state.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    NgIf,
    ProfileInfoComponent,
    ProfileIconsComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;

  public koef = 0;

  constructor(public profileService: ProfileStateService) {}
}
