import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // ================================================
  // =              ATTRIBUTES SECTION              =
  // ================================================

  registerMode = false;

  values: any;

  // ================================================
  // =             CONSTRUCTOR SECTION              =
  // ================================================

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadData();
  }

  // ================================================
  // =              BUSINESS METHODS                =
  // ================================================

  toRegister() {
    this.registerMode = true;
  }

  cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }

  private loadData() {
    this.http.get('http://localhost:5000/api/values').subscribe(
      response => {
        this.values = response;
      },
      error => {
        console.log(error);
      }
    );
  }
}
