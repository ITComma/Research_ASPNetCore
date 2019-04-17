import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { AlertifyService } from 'src/app/core/services/alertify.service';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  // ================================================
  // =              ATTRIBUTES SECTION              =
  // ================================================

  model: any = {
    username: '',
    password: ''
  };

  currentUser: User;
  currentUserPhotoUrl: string;

  // ================================================
  // =             CONSTRUCTOR SECTION              =
  // ================================================

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      if (user == null) {
        return;
      }

      this.currentUser = user;

      if (user.photoUrl == null) {
        this.currentUserPhotoUrl = '../../../assets/user-photo.png';
      } else {
        this.currentUserPhotoUrl = user.photoUrl;
      }
    });
  }

  // ================================================
  // =                EVENT SECTION                 =
  // ================================================

  public login() {
    this.authService.login(this.model).subscribe(
      next => {
        this.alertify.success('Logged in successfully');
      },
      error => {
        console.error(error);
        this.alertify.error('Login fail!');
      },
      () => {
        this.router.navigate(['/members']);
      }
    );
  }

  public logout() {
    this.authService.logout();
    this.alertify.message('Logged out');
    this.router.navigate(['/home']);
  }

  public isLoggedIn() {
    return this.authService.loggedIn();
  }
}
