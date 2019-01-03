import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  // ================================================
  // =                EVENT SECTION                 =
  // ================================================

  public login() {
    console.log(this.model.username);
    console.log(this.model.password);
  }
}
