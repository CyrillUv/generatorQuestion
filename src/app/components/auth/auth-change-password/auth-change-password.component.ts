import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {ToastService} from "../../custom/toast/toast.service";
import {ToastStatus} from "../../custom/toast/toast.component";
import {BanLanguageDirective} from "../../../shared/ban-language.directive";
import {CharsLengthPipe} from "../../../shared/chars-length-sampling.pipe"
import {AuthStateService} from "../services/auth-state.service";
import {ApiAuthService} from "../services/api-auth.service";
@Component({
  selector: 'app-auth-change-password',
  standalone: true,
  imports: [FormsModule, NgClass, NgIf, BanLanguageDirective,CharsLengthPipe],
  templateUrl: './auth-change-password.component.html',
  styleUrl: '../auth.component.scss',
})
export class AuthChangePasswordComponent implements OnInit{
  // @Input({ required: true }) public currentUserLogin!: string;
  @Output() public openChangePassword: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() public determinantPasswordComplexityEmitter: EventEmitter<string> =
    new EventEmitter<string>();
  public credForChangePassword = { newPassword: '', confirmPassword: '' };
  public showPassword = false;
  public currentUserId!:string
  constructor(private toastService: ToastService,public authService: AuthStateService,private apiAuthService:ApiAuthService) {}
  // замена нового пароля вместо старого
  ngOnInit(){
    this.apiAuthService.getCurrentUser().subscribe(res=>{
      this.currentUserId = res[0].id as string
      console.log(this.currentUserId)
    })

  }
  public reductionPassword(): void {
    //если данные в форме заполнены и совпадают
    if (
      this.credForChangePassword.newPassword &&
      this.credForChangePassword.confirmPassword &&
      this.credForChangePassword.newPassword ===
        this.credForChangePassword.confirmPassword
    ) {
      // const oldUser = JSON.parse(
      //   localStorage.getItem(this.currentUserLogin) as string,
      // );
      //создается новый аккаунт
      // const newAccount = {
      //   login: oldUser.login,
      //   password: this.credForChangePassword.newPassword,
      //   secretWord: oldUser.secretWord,
      // };
      //и отправляется в ls
      // localStorage.setItem(this.currentUserLogin, JSON.stringify(newAccount));
      this.apiAuthService.patchUser(this.currentUserId,this.credForChangePassword.newPassword).subscribe()
      this.apiAuthService.deleteCurrentUser(this.currentUserId).subscribe()
      this.apiAuthService.getCurrentUser().subscribe(res=>{
        console.log(res)
      })
      this.toastService.openToast({
        title: 'Успех!',
        type: ToastStatus.success,
        description: 'Пароль успешно изменён!',
      });
      this.openChangePassword.emit(false);
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
  public determinantPasswordComplexity() {
    this.determinantPasswordComplexityEmitter.emit(
      this.credForChangePassword.newPassword,
    );
  }

}
