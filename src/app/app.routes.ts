import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';
import { ChangeMeComponent } from './change-me';

import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'change-me', component: ChangeMeComponent },
  {
    path: 'detail', loadChildren: () => System.import('./+detail').then((comp: any) => comp.default),
  },
  { path: '**',    component: NoContentComponent },
];
