import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { AlertifyService } from 'src/app/core/services/alertify.service';

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

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {}

  // ================================================
  // =              BUSINESS METHODS                =
  // ================================================

  register() {
    this.authService.register(this.model).subscribe(
      () => {
        this.alertify.success('Registration successfully');
      },
      error => {
        console.log(error);
        this.alertify.error('Registration fail!');
        return error;
      }
    );
  }

  cancel() {
    this.canceled.emit(false);
  }
}
