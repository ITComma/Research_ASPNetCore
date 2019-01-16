import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

// Vendors
import { BsDropdownModule } from 'ngx-bootstrap';

// Components
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    NavBarComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,

    BsDropdownModule
  ],
  providers: [
  ],
  exports: [
    NavBarComponent,
    RegisterComponent
  ]
})
export class SharedModule {}
