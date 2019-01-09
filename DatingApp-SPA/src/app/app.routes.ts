import { Routes } from '@angular/router';

// Components
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';

// Guards
import { AuthGuard } from './_guards/auth.guard';
import { MemberListComponent } from './member/member-list/member-list.component';


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
        path: 'members',
        component: MemberListComponent
      },
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
