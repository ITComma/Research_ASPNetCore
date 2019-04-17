import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DeactivableComponent } from 'src/app/core/guards/prevent-unsaved-changes.guard';
import { User } from 'src/app/core/models/user';
import { AlertifyService } from 'src/app/core/services/alertify.service';
import { UserService } from 'src/app/core/services/user.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit, DeactivableComponent {
  // ================================================
  // =              ATTRIBUTES SECTION              =
  // ================================================

  @ViewChild('editForm')
  editForm: NgForm;

  user: User;
  photoUrl: string;

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data.user;
    });

    this.authService.currentUser.subscribe(user => {
      if (user == null) { return; }

      if (user.photoUrl != null) {
        this.photoUrl = user.photoUrl;
      } else {
        this.photoUrl = '../../../../assets/user-photo.png';
      }
    });
  }

  // ================================================
  // =                EVENT SECTION                 =
  // ================================================

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  updateUser() {
    this.userService
      .updateUser(this.authService.decodedToken.nameid, this.user)
      .subscribe(
        next => {
          this.alertify.success('Profile updated successfully');
          this.editForm.reset(this.user);
        },
        error => {
          this.alertify.error(error);
        }
      );
  }

  beDeactive() {
    if (this.editForm.dirty) {
      return confirm(
        'Are you sure you want to continue, Any unsaved changes will be lost'
      );
    }

    return true;
  }

  updateMainPhoto(photoUrl) {
    this.user.photoUrl = photoUrl;
  }
}
