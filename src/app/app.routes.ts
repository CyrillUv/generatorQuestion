import { Routes } from '@angular/router';
import { MenuComponent } from './components';
import { StatisticsComponent } from './components';

import { ActivateStatistics } from './guards';
import {AuthComponent} from "./components/auth/auth.component";
import {AntiAuthGuard, AuthGuard} from "./guards";

export const routes: Routes = [
  { path: '', component: MenuComponent,canActivate: [AuthGuard]},
  { path: 'auth', component: AuthComponent, canActivate: [AntiAuthGuard] },
  { path: 'menu', component: MenuComponent ,canActivate: [AuthGuard]},
  {
    path: 'documents',canActivate: [AuthGuard],
    loadComponent: () =>
      import('./components/documents/documents.component').then(
        (c) => c.DocumentsComponent,
      ),
  },
  {
    path: 'screen',canActivate: [AuthGuard],
    loadComponent: () =>
      import('./components/screen/screen.component').then(
        (c) => c.ScreenComponent,
      ),
  },
  {
    path: 'testing',canActivate: [AuthGuard],
    loadComponent: () =>
      import('./components/testing/testing.component').then(
        (t) => t.TestingComponent,
      ),
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
    canActivate: [ActivateStatistics,AuthGuard],
  },
  {
    path: 'questions',canActivate: [AuthGuard],
    loadComponent: () =>
      import('./components/questions/questions.component').then(
        (c) => c.QuestionsComponent,
      ),
  },{
    path: 'profile',canActivate: [AuthGuard],
    loadComponent: () =>
      import('./components/profile/profile.component').then(
        (c) => c.ProfileComponent,
      ),
  },
  { path: '**', component: MenuComponent,canActivate:[AuthGuard] },
];
