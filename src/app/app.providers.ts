import {AUTHORIZATION_TOKEN} from "./data/tokens/tokens";
import {BehaviorSubject} from "rxjs";
import {APP_INITIALIZER, Provider} from "@angular/core";
import {Router} from "@angular/router";

export const authProvider: Provider =  {
  provide:AUTHORIZATION_TOKEN,
  useValue:new BehaviorSubject(JSON.parse(localStorage.getItem('isLogin') as string))
}
export const initializerProvider: Provider =   {
  provide: APP_INITIALIZER,
  useFactory: (token: BehaviorSubject<boolean>, _router: Router) => {
    return () => {
      if (!token.value) {
        _router.navigate(['/auth']).then((r) => r);
      }
    };
  },
  deps: [AUTHORIZATION_TOKEN, Router],
  multi: true,
}

export const appProvider: Provider[] = [
  authProvider, initializerProvider
]
