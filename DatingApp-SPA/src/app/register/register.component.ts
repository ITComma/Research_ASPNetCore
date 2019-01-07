import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // ================================================
  // =              ATTRIBUTES SECTION              =
  // ================================================

  @Output()
  registered = new EventEmitter<any>();
  @Output()
  canceled = new EventEmitter<any>();

  model: any = {
    username: '',
    password: ''
  };


  // ================================================
  // =             CONSTRUCTOR SECTION              =
  // ================================================

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }


  // ================================================
  // =              BUSINESS METHODS                =
  // ================================================

  register() {
    this.authService.register(this.model)
      .subscribe(
        (response) => {
          console.log(response);
        }
      );
  }

  cancel() {
    this.canceled.emit(false);
  }
}
