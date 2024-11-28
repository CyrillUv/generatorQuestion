import { Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { StatisticsComponent } from './components/statistics/statistics.component';

import { ActivateStatistics } from './guards/activate-statistics.guard';
import {AuthComponent} from "./components/auth/auth.component";
import {AuthGuard} from "./guards/auth.guard";

export const routes: Routes = [
  { path: '', component: MenuComponent,canActivate: [AuthGuard]},
  { path: 'auth', component: AuthComponent },
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
  },
  { path: '**', component: MenuComponent,canActivate:[AuthGuard] },
];
