import { Component } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import {
  ToastComponent,
  ToastStatus,
} from './components/custom/toast/toast.component';
import { LoaderComponent } from './components/custom/loader/loader.component';
import { LoadingBarComponent } from './components/custom/loader/loading-bar/loading-bar.component';
import { ToastService } from './components/custom/toast/toast.service';
import { timer } from 'rxjs';
import { AuthComponent } from './components/auth/auth.component';
import { MenuService } from './data/menu/menu.service';
import {MyButtonComponent} from "uga-uga-uga-32";
import {AuthStateService} from "./components/auth/services/auth-state.service";
import {ApiAuthService} from "./components/auth/services/api-auth.service";

interface Backend {
  title: string;
  planned: boolean;
  parachutes: string[];
  id: string;
  readiness: boolean;
}

interface Frontend {
  name: string;
  planning: boolean;
  parachutes: string[];
  id: string;
  ready: boolean;
}

class DesantAdapter {
  public static toFrontend(value: Backend): Frontend {
    return {
      name: value.title,
      planning: value.planned,
      ready: value.readiness,
      ...value,
    };
  }

  public static toBackend(value: Frontend): Backend {
    return {
      title: value.name,
      planned: value.planning,
      readiness: value.ready,
      ...value,
    };
  }
}

type CurrentEventType = 0 | 1 | 2 | 3;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ToastComponent,
    LoaderComponent,
    LoadingBarComponent,
    AuthComponent,
    RouterLink,
    MyButtonComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public navigationType: CurrentEventType = 0;

  constructor(
    public router: Router,
    private toastService: ToastService,
    public ms: MenuService,public authService:AuthStateService,
    public apiAuthService:ApiAuthService
  ) {


    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) this.navigationType = 0;
      if (event instanceof NavigationEnd) this.navigationType = 1;
      if (event instanceof NavigationCancel) {
        // console.log('cancel')
        // this.navigationType = 2;
        // this.toastService.openToast({
        //   title: 'Перенаправление ',
        //   type: ToastStatus.warning,
        //   description: 'Вы будете перенаправлены на страницу авторизации',
        //   timer: 5000,
        // });
        // timer(5000).subscribe(() => this.router.navigate(['/auth']));
      }
      if (event instanceof NavigationError) {
        // console.log('error')
        // this.navigationType = 3;
        // this.toastService.openToast({
        //   title: 'Страница не найдена!',
        //   type: ToastStatus.warning,
        //   description: 'Вы будете перенаправлены на страницу авторизации',
        //   timer: 1000,
        // });
        // timer(5000).subscribe(() => this.router.navigate(['/auth']));
      }
    });

  }

}
