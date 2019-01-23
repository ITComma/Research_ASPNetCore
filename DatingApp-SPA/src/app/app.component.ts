import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // ==========================================
  // =          Constructors Section          =
  // ==========================================

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.decodeToken();
    this.authService.getCurrentUser();
  }
}
