import { Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { StatisticsComponent } from './components/statistics/statistics.component';

import { ActivateStatistics } from './guards/activate-statistics.guard';

export const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'menu', component: MenuComponent },
  {
    path: 'documents',
    loadComponent: () =>
      import('./components/documents/documents.component').then(
        (c) => c.DocumentsComponent,
      ),
  },
  {
    path: 'screen',
    loadComponent: () =>
      import('./components/screen/screen.component').then(
        (c) => c.ScreenComponent,
      ),
  },
  {
    path: 'testing',
    loadComponent: () =>
      import('./components/testing/testing.component').then(
        (t) => t.TestingComponent,
      ),
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
    canActivate: [ActivateStatistics],
  },
  {
    path: 'questions',
    loadComponent: () =>
      import('./components/questions/questions.component').then(
        (c) => c.QuestionsComponent,
      ),
  },
  // { path: '**', component: MenuComponent },
];
