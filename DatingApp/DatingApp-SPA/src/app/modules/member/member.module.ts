import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Sub Modules
import { SharedModule } from 'src/app/shared/shared.module';

// Vendors
import { BsDropdownModule, TabsModule, PaginationModule, ButtonsModule } from 'ngx-bootstrap';
import { NgxGalleryModule } from 'ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';

// Components
import { MemberListComponent } from './member-list/member-list.component';
import { MemberCardComponent } from './member-card/member-card.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { PhotoEditorComponent } from './photo-editor/photo-editor.component';

// Routing
import { memberRoutes } from './member.routes';
import { MemberMessagesComponent } from './member-messages/member-messages.component';


@NgModule({
  declarations: [
    MemberListComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberEditComponent,
    MemberMessagesComponent,
    PhotoEditorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,

    BsDropdownModule,
    PaginationModule,
    TabsModule,
    ButtonsModule,
    NgxGalleryModule,
    FileUploadModule,

    RouterModule.forChild(memberRoutes),

    SharedModule
  ],
  providers: [
  ],
  exports: [
    MemberCardComponent
  ]
})
export class MemberModule {}
