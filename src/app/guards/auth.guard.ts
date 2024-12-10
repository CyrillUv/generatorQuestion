import { Inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AUTHORIZATION_TOKEN } from '../data/tokens/tokens';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {ApiAuthService} from "../components/auth/services/api-auth.service";
import {AuthStateService} from "../components/auth/services/auth-state.service";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AUTHORIZATION_TOKEN) private authToken$: BehaviorSubject<boolean>,private apiAuthService:ApiAuthService,
    private _router: Router,private authService:AuthStateService
  ) {}

  public canActivate(): Observable<boolean> {
    return this.apiAuthService.getCurrentUser().pipe(map(res => {
      // Проверяем, получили ли мы текущего пользователя
      if (res && res.length > 0) {
        this.authToken$.next(true); // Устанавливаем статус аутентификации в true
        return true
      } else {
        this.authService.getCurrentUserId().subscribe(res=>
        {
          console.log(res)
          if(res)
            this.apiAuthService.deleteCurrentUser(res).subscribe()
        })
        this._router.navigate(['/auth']).then((r) => r);
        this.authToken$.next(false); // Устанавливаем статус аутентификации в false
        return false
      }
    }));
  }
}
