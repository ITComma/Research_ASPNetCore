import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Sub Modules
import { SharedModule } from 'src/app/shared/shared.module';

// Components
import { MessagesComponent } from './messages.component';

// Routing
import { messagesRoutes } from './messages.routes';
import { BrowserModule } from '@angular/platform-browser';
import { MessagesResolver } from 'src/app/core/resolvers/messages.resolver';
import { PaginationModule } from 'ngx-bootstrap';


@NgModule({
  declarations: [
    MessagesComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,

    PaginationModule,

    RouterModule.forChild(messagesRoutes),

    SharedModule
  ],
  providers: [
    MessagesResolver
  ]
})
export class MessagesModule {}
