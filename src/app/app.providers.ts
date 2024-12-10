import {AUTHORIZATION_TOKEN} from "./data/tokens/tokens";
import {BehaviorSubject} from "rxjs";
import {APP_INITIALIZER, Provider} from "@angular/core";
import {Router} from "@angular/router";
import {ApiAuthService, IUser} from "./components/auth/services/api-auth.service";

export const authProvider: Provider =  {
  provide:AUTHORIZATION_TOKEN,
  useValue:new BehaviorSubject(JSON.parse(localStorage.getItem('isLogin') as string))
}
export const initializerProvider: Provider =   {
  provide: APP_INITIALIZER,
  useFactory: (token: BehaviorSubject<boolean>, _router: Router,apiAuthService:ApiAuthService) => {
    return () => {
      return new Promise<void>((resolve) => {
        apiAuthService.getCurrentUser().subscribe(res => {
          if (res && res.length > 0) {
            // Если текущий пользователь найден, просто разрешаем Promise.
            resolve();
          } else {
            // Если пользователь не найден, перенаправляем его на /auth
            _router.navigate(['/auth']).then(() => resolve());
          }
        });
      });
    };
  },
  deps: [AUTHORIZATION_TOKEN, Router,ApiAuthService],
  multi: true,
}

export const appProvider: Provider[] = [
  authProvider, initializerProvider
]
