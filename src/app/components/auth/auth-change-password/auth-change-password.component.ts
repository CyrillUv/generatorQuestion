import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { ToastService } from '../../custom/toast/toast.service';
import { ToastStatus } from '../../custom/toast/toast.component';
import { BanLanguageDirective } from '../../../shared/ban-language.directive';
import { CharsLengthPipe } from '../../../shared/chars-length-sampling.pipe';
import { AuthStateService } from '../services/auth-state.service';
import { ApiAuthService } from '../services/api-auth.service';

@Component({
  selector: 'app-auth-change-password',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    NgIf,
    BanLanguageDirective,
    CharsLengthPipe,

  ],
  templateUrl: './auth-change-password.component.html',
  styleUrl: '../auth.component.scss',
})
export class AuthChangePasswordComponent {
  // данные по изменению пароля
  public credForChangePassword = { newPassword: '', confirmPassword: '' };
  // показ пароля
  public showPassword = false;

  constructor(
    private toastService: ToastService,
    public authService: AuthStateService,
    private apiAuthService: ApiAuthService,
  ) {}

  // замена нового пароля вместо старого
  public reductionPassword(): void {
    //если данные в форме заполнены и совпадают
    if (
      this.credForChangePassword.newPassword &&
      this.credForChangePassword.confirmPassword &&
      this.credForChangePassword.newPassword ===
        this.credForChangePassword.confirmPassword
    ) {
      let currentUserId!: string;
      this.authService.getCurrentUserId().subscribe(
        (res) => {
          if (res) {
            currentUserId = res;

            // Изменение пароля
            this.apiAuthService
              .patchUser(currentUserId, this.credForChangePassword.newPassword)
              .subscribe(
                () => {
                  // Если изменение пароля прошло успешно, вы можете выполнить дальнейшие действия здесь
                  this.toastService.openToast({
                    title: 'Успех!',
                    type: ToastStatus.success,
                    description: 'Пароль успешно изменён!',
                  });
                },
                (error) => {
                  console.error('Ошибка при изменении пароля:', error);
                  this.toastService.openToast({
                    title: 'Ошибка!',
                    type: ToastStatus.error,
                    description: 'Не удалось изменить пароль.',
                  });
                },
              );

            // Удаление текущего юзера
            this.apiAuthService.deleteCurrentUser(currentUserId).subscribe(
              (deleteResponse) => {
                // Обработка успешного удаления пользователя
                console.log('Пользователь успешно удалён:', deleteResponse);
              },
              (error) => {
                console.error('Ошибка при удалении пользователя:', error);
                this.toastService.openToast({
                  title: 'Ошибка!',
                  type: ToastStatus.error,
                  description: 'Не удалось удалить пользователя.',
                });
              },
            );
          } else {
            this.toastService.openToast({
              title: 'Ошибка!',
              type: ToastStatus.error,
              description: 'ID пользователя не найден.',
            });
          }
        },
        () => {
          this.toastService.openToast({
            title: 'Ошибка!',
            type: ToastStatus.error,
            description: 'Не удалось получить ID пользователя.',
          });
        },
      );
      this.authService.setChangePassword(false);
      this.credForChangePassword = { newPassword: '', confirmPassword: '' };
    } else {
      this.toastService.openToast({
        title: 'Ошибка!',
        type: ToastStatus.warning,
        description: 'Пароли не совпадают или поля пустые',
      });
    }
  }

  public showHiddenPassword(): void {
    this.showPassword = !this.showPassword;
  }
}
