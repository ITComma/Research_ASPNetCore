import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Custom Modules
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ValueModule } from './modules/value/value.module';
import { MessagesModule } from './modules/messages/messages.module';
import { MemberModule } from './modules/member/member.module';
import { ListsModule } from './modules/lists/lists.module';

// Vendors
import { BsDropdownModule, TabsModule, BsDatepickerModule, PaginationModule, ButtonsModule } from 'ngx-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';
import { TimeAgoPipe } from 'time-ago-pipe';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

// Routing
import { appRoutes } from './app.routes';


export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/api/auth']
      }
    }),

    RouterModule.forRoot(appRoutes),

    CoreModule,
    SharedModule,
    ValueModule,
    MessagesModule,
    MemberModule,
    ListsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
