import { Component } from '@angular/core';
import {
  EventType,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { ToastComponent } from './components/custom/toast/toast.component';
import { LoaderComponent } from './components/custom/loader/loader.component';
import { LoadingBarComponent } from './components/custom/loader/loading-bar/loading-bar.component';
import { filter } from 'rxjs';

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
  imports: [RouterOutlet, ToastComponent, LoaderComponent, LoadingBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public navigationType: CurrentEventType = 0;
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) this.navigationType = 0;
      if (event instanceof NavigationEnd) this.navigationType = 1;
      if (event instanceof NavigationCancel) this.navigationType = 2;
      if (event instanceof NavigationError) this.navigationType = 3;
    });
  }
}
