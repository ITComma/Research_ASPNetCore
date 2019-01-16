import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Components
import { ValueComponent } from './value.component';


@NgModule({
  declarations: [
    ValueComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
  ]
})
export class ValueModule {}
