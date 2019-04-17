import { NgModule } from '@angular/core';


// Components
import { ListsComponent } from './lists.component';
import { RouterModule } from '@angular/router';
import { listsRoutes } from './lists.routes';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap';
import { MemberModule } from '../member/member.module';
import { ListsResolver } from 'src/app/core/resolvers/lists.resolver';


@NgModule({
  declarations: [
    ListsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forChild(listsRoutes),

    PaginationModule,
    MemberModule
  ],
  providers: [
    ListsResolver
  ]
})
export class ListsModule {}
