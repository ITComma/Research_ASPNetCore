import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { NgForm } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { DeactivableComponent } from 'src/app/_guards/prevent-unsaved-changes.guard';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';

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
      .subscribe(next => {
        this.alertify.success('Profile updated successfully');
        this.editForm.reset(this.user);
      }, error => {
        this.alertify.error(error);
      });
  }

  beDeactive() {
    if (this.editForm.dirty) {
      return confirm(
        'Are you sure you want to continue, Any unsaved changes will be lost'
      );
    }

    return true;
  }
}
