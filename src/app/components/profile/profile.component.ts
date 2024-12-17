import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiProfileService } from './services/api-profile.service';
import { CURRENT_USER_TOKEN$ } from '../../data';
import { BehaviorSubject } from 'rxjs';
import { IProfile, IUser } from '../auth';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, FormsModule, NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;

  public imageSrc: string | ArrayBuffer | null = null;
  public koef = 0;

  constructor(
    private apiProfileService: ApiProfileService,
    @Inject(CURRENT_USER_TOKEN$) private currentUser$: BehaviorSubject<IUser>,
  ) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrc = e.target.result;

        const img = new Image();
        if (typeof this.imageSrc === 'string') {
          img.src = this.imageSrc;
          console.log(img.src);
          const { id, login, moderator, admin } = this.currentUser$.value;

          const profile: IProfile = {
            userId: id as string,
            name: login,
            role: admin ? 'admin' : moderator ? 'moderator' : 'user',image:img.src
          };
          this.apiProfileService.setProfileInCurrentUser(profile).subscribe(res=>{
            console.log(res)
          })
        }

        img.onload = () => {
          const widthImg = img.width;
          const widthContent = 342;

          console.log('widthImg = ' + widthImg);
          console.log('widthContent = ' + widthContent);

          // Проверяем ширину изображения и вычисляем коэффициент
          if (widthImg > widthContent) {
            const koef = widthImg / widthContent;
            this.koef = Math.round(koef * 1000);
          } else {
            this.koef = 0; // или другое значение по умолчанию
          }
        };
      };
      reader.readAsDataURL(file);
    }
  }
}
