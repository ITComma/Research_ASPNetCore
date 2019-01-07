import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Vendors
import {BsDropdownModule} from 'ngx-bootstrap';

// Components
import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

// Services
import { AuthService } from './services/auth.service';
import { ErrorInterceptorProvider } from './services/error.interceptor';
import { AlertifyService } from './services/alertify.service';

@NgModule({
   declarations: [
      AppComponent,
      ValueComponent,
      NavBarComponent,
      HomeComponent,
      RegisterComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BsDropdownModule.forRoot()
   ],
   providers: [
      AuthService,
      AlertifyService,

      ErrorInterceptorProvider
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
