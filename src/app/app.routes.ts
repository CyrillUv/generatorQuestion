import {ResolveFn, Routes} from '@angular/router';
import {MenuComponent} from "./components/menu/menu.component";
import {StatisticsComponent} from "./components/statistics/statistics.component";
import {CategoryComponent} from "./components/doc-children/category-doc/category-doc.component";
import {inject} from "@angular/core";
import {DataService} from "./data/data.service";
import {ActivateStatistics} from "./guards/activate-statistics.guard";


const resolver: ResolveFn<boolean> = () => {
  const test = inject(DataService);
  return test?.id || true
}



//documents/category/js
export const routes: Routes = [
  {path:'',component:MenuComponent,},
  {path:'menu',component:MenuComponent},
  {path:'documents',
    // component:DocumentsComponent,
    loadComponent: () =>
    import('./components/documents/documents.component').then(c => c.DocumentsComponent)
    ,
    // children: [
    //   {path: 'category/:title', component: CategoryComponent},
    //   {path: '', component: DocChildren},
    // ]
  },
  {path:'screen',loadComponent:()=>
  import('./components/screen/screen.component').then(c => c.ScreenComponent)
  },
  {path: 'category/:title', component: CategoryComponent, data: { name: 'Kirill' }, resolve: { 'test': resolver}},
  {path:'statistics',component:StatisticsComponent,canActivate:[ActivateStatistics]},
  {path:'questions',loadComponent:()=>
  import('./components/questions/questions.component').then(c => c.QuestionsComponent)},
  {path:'**',component:MenuComponent},

];

