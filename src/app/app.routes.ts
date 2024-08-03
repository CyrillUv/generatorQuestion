import { Routes } from '@angular/router';
import {MenuComponent} from "./components/menu/menu.component";
import {DocumentsComponent} from "./components/documents/documents.component";
import {StatisticsComponent} from "./components/statistics/statistics.component";
import {QuestionsComponent} from "./components/questions/questions.component";

export const routes: Routes = [
  {path:'',component:MenuComponent},
  {path:'menu',component:MenuComponent},
  {path:'documents',component:DocumentsComponent},
  {path:'statistics',component:StatisticsComponent},
  {path:'questions',component:QuestionsComponent},
  {path:'**',component:MenuComponent},

];
