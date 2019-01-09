import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

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
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {}

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
    localStorage.removeItem('token');
    this.alertify.message('Logged out');
    this.router.navigate(['/home']);
  }

  public isLoggedIn() {
    return this.authService.loggedIn();
  }
}
