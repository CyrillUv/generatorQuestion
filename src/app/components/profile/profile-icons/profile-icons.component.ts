import { Component, Inject } from '@angular/core';
import { ProfileIconComponent } from './profile-icon.component';
import { NgForOf } from '@angular/common';
import { IIcon, ProfileStateService } from '../services/profile-state.service';
import { ApiProfileService } from '../services/api-profile.service';
import { CURRENT_USER_TOKEN$ } from '../../../data';
import { BehaviorSubject } from 'rxjs';
import { ICurrentUser } from '../../auth';

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
    { id: 1, src: 'setter.png' },
    { id: 2, src: 'screen.png' },
    { id: 3, src: 'pipe.png' },
    { id: 4, src: 'subscribers.png' },
    { id: 5, src: 'subscribers2.png' },
    { id: 6, src: 'takeUntil.png' },
    { id: 7, src: 'takeUntil2.png' },
    { id: 8, src: 'lifeCycle2.png' },
    { id: 9, src: 'canActivate.png' },
    { id: 10, src: 'avatar.png' },
  ];

  constructor(
    public profileService: ProfileStateService,
    private apiProfileService: ApiProfileService,
    @Inject(CURRENT_USER_TOKEN$)
    private currentUser$: BehaviorSubject<ICurrentUser>,
  ) {}

  public setProfileIcon(icon: IIcon) {
    if (this.profileService.profile$.value?.id) {
      this.apiProfileService
        .patchProfileInCurrentUser(
          this.profileService.profile$.value?.id as string,
          icon.src,
        )
        .subscribe(() => {
          // Обновите локальное состояние профиля
          if (this.profileService.profile$.value)
            this.profileService.profile$.next({
              ...this.profileService.profile$.value,
              image: icon.src,
            });
        });
    } else {
      this.apiProfileService
        .postProfileInCurrentUser({
          image: icon.src,
          name: this.currentUser$.value.login,
          role: 'user',
          userId: this.currentUser$.value.id as string
        })
        .subscribe((res) => {
            if (!this.profileService.profile$.value) {
              this.profileService.profile$.next(
                res
                // Обновите другие поля, если это необходимо
              );
            }
          });
    }
  }
}
