import { NgModule } from '@angular/core';


// Services
import { AuthService } from './services/auth.service';
import { AlertifyService } from './services/alertify.service';
import { ErrorInterceptorProvider } from './services/error.interceptor';
import { UserService } from './services/user.service';

// Resolver
import { MemberDetailResolver } from './resolvers/member-detail.resolver';
import { MemberListResolver } from './resolvers/member-list.resolver';
import { MemberEditResolver } from './resolvers/member-edit.resolver';

// Guards
import { PreventUnsavedChanges } from './guards/prevent-unsaved-changes.guard';
import { AuthGuard } from './guards/auth.guard';


@NgModule({
  declarations: [
  ],
  imports: [
  ],
  providers: [
    PreventUnsavedChanges,
    AuthGuard,
    AuthService,
    AlertifyService,
    ErrorInterceptorProvider,
    UserService,
    MemberDetailResolver,
    MemberListResolver,
    MemberEditResolver
  ]
})
export class CoreModule {}
