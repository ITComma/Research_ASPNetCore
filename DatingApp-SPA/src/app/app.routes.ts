import { Routes } from '@angular/router';

// Components
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './modules/member/member-list/member-list.component';
import { MemberDetailComponent } from './modules/member/member-detail/member-detail.component';
import { MessagesComponent } from './modules/messages/messages.component';
import { ListsComponent } from './modules/lists/lists.component';

// Guards
import { AuthGuard } from './core/guards/auth.guard';



export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'messages',
        component: MessagesComponent
      },
      {
        path: 'lists',
        component: ListsComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
