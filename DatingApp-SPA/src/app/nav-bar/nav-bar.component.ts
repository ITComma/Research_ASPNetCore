import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';

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

  // ================================================
  // =             CONSTRUCTOR SECTION              =
  // ================================================

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {}

  // ================================================
  // =                EVENT SECTION                 =
  // ================================================

  public login() {
    this.authService.login(this.model).subscribe(
      () => {
        this.alertify.success('Logged in successfully');
      },
      error => {
        console.error(error);
        this.alertify.error('Login fail!');
      }
    );
  }

  public logout() {
    localStorage.removeItem('token');
    this.alertify.message('Logged out');
  }

  public isLoggedIn() {
    return this.authService.loggedIn();
  }
}
