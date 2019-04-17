
import { Routes } from '@angular/router';

// Components
import { ListsComponent } from './lists.component';

// Guards

// Resolvers
import { ListsResolver } from 'src/app/core/resolvers/lists.resolver';

export const listsRoutes: Routes = [
  {
    path: 'lists',
    component: ListsComponent,
    resolve: {
      users: ListsResolver
    }
  },
];
