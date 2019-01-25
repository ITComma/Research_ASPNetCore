import { Routes } from '@angular/router';
import { MessagesComponent } from './messages.component';
import { MessagesResolver } from 'src/app/core/resolvers/messages.resolver';

// Components

// Guards

// Resolvers

export const messagesRoutes: Routes = [
  {
    path: 'messages',
    component: MessagesComponent,
    resolve: { messages: MessagesResolver }
  }
];
