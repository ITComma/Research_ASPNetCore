import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Vendors
import { BsDropdownModule, BsDatepickerModule } from 'ngx-bootstrap';

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
    ReactiveFormsModule,

    BsDropdownModule,
    BsDatepickerModule
  ],
  providers: [
  ],
  exports: [
    NavBarComponent,
    RegisterComponent
  ]
})
export class SharedModule {}
