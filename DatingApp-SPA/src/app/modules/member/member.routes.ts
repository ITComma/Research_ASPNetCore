import { Routes } from '@angular/router';

// Components
import { MemberEditComponent } from './member-edit/member-edit.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';

// Guards
import { PreventUnsavedChanges } from 'src/app/core/guards/prevent-unsaved-changes.guard';

// Resolvers
import { MemberListResolver } from 'src/app/core/resolvers/member-list.resolver';
import { MemberDetailResolver } from 'src/app/core/resolvers/member-detail.resolver';
import { MemberEditResolver } from 'src/app/core/resolvers/member-edit.resolver';

export const memberRoutes: Routes = [
  {
    path: 'members',
    component: MemberListComponent,
    resolve: {
      users: MemberListResolver
    }
  },
  {
    path: 'members/:id',
    component: MemberDetailComponent,
    resolve: {
      user: MemberDetailResolver
    }
  },
  {
    path: 'members/edit',
    component: MemberEditComponent,
    resolve: {
      user: MemberEditResolver
    },
    canDeactivate: [PreventUnsavedChanges]
  }
];
