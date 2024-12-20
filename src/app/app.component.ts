import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
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
  AuthStateService,
  IProfile,
  IUser,
  LoaderComponent,
  ToastComponent,
  ToastService,
} from './components';
import { LoadingBarComponent } from './components/custom/loader/loading-bar';
import { AuthComponent } from './components/auth/auth.component';
import { AUTHORIZATION_TOKEN$, CURRENT_USER_TOKEN$, MenuService } from './data';
import { MyButtonComponent } from 'uga-uga-uga-32';
import {AsyncPipe, NgOptimizedImage} from '@angular/common';
import { ApiProfileService } from './components/profile/services/api-profile.service';
import { ProfileStateService } from './components/profile/services/profile-state.service';
import {BehaviorSubject, Observable} from 'rxjs';

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
    NgOptimizedImage,
    AsyncPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewInit {
  public navigationType: CurrentEventType = 0;

  public get currentProfile$(): Observable<IProfile | null> {
    return this._profileStateService.profile$;
  };

  constructor(
    public router: Router,
    public ms: MenuService,
    public authService: AuthStateService,
    public apiProfileService: ApiProfileService,
    private _toastService: ToastService,
    private _profileStateService: ProfileStateService,
    @Inject(AUTHORIZATION_TOKEN$) private _auth$: BehaviorSubject<boolean>,
    @Inject(CURRENT_USER_TOKEN$) private _currentUser$: BehaviorSubject<IUser>,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) this.navigationType = 0;
      if (event instanceof NavigationEnd) this.navigationType = 1;
      if (event instanceof NavigationCancel) {
        // console.log('cancel')
        // this.navigationType = 2;
        // this._toastService.openToast({
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
        // this._toastService.openToast({
        //   title: 'Страница не найдена!',
        //   type: ToastStatus.warning,
        //   description: 'Вы будете перенаправлены на страницу авторизации',
        //   timer: 1000,
        // });
        // timer(5000).subscribe(() => this.router.navigate(['/auth']));
      }
    });
  }

  public ngOnInit() {
    if (this._auth$.value) {
      this.apiProfileService.getProfile().subscribe((res) => {
        if (res && res.length) {
          const currentProfile: IProfile | undefined = res.find(
            (el) => el.userId === this._currentUser$.value.id,
          );
          console.log(this._currentUser$.value)
          console.log(res)
          if (currentProfile) {
            this._profileStateService.profile$.next(currentProfile);
          }
        }
      });
    }
  }

  public ngAfterViewInit() {
    this._toastService.openToast();
  }
}
