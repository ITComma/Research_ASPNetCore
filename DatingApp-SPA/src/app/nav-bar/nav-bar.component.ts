import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

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

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  // ================================================
  // =                EVENT SECTION                 =
  // ================================================

  public login() {
    this.authService.login(this.model).subscribe(
      next => {
        console.log('>>>> Logged in successfully');
      },
      error => {
        console.log(error);
      }
    );
  }

  public loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  public logout() {
    localStorage.removeItem('token');
    console.log('>>>> Logged Out');
  }
}
