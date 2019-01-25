import { Routes } from '@angular/router';

// Components
import { HomeComponent } from './home/home.component';

// Guards
import { AuthGuard } from './core/guards/auth.guard';

export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
