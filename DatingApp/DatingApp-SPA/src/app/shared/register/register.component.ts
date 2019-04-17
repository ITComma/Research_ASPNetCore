import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { AlertifyService } from 'src/app/core/services/alertify.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { User } from 'src/app/core/models/user';
import { Router } from '@angular/router';

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

  registerForm: FormGroup;

  registUser: User;

  bsConfig: Partial<BsDatepickerConfig>;

  // ================================================
  // =             CONSTRUCTOR SECTION              =
  // ================================================

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    };

    this.createRegisterForm();
  }

  // ================================================
  // =                EVENT SECTION                 =
  // ================================================

  register() {
    if (this.registerForm.valid) {
      this.registUser = Object.assign({}, this.registerForm.value);
      this.authService.register(this.registUser).subscribe(
        () => {
          this.alertify.success('Registration successfully');
        },
        error => {
          console.log(error);
          this.alertify.error('Registration fail!');
          return error;
        },
        () => {
          this.authService.login({username: this.registUser.username, password: this.registUser.password})
            .subscribe(
              () => {
                this.router.navigate(['/members']);
              }
            );
        }
      );
    }
  }

  cancel() {
    this.canceled.emit(false);
  }

  // ================================================
  // =              BUSINESS METHODS                =
  // ================================================

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value
      ? null
      : { mismatch: true };
  }

  private createRegisterForm() {
    this.registerForm = this.fb.group(
      {
        gender: ['male'],
        username: ['', [Validators.required]],
        knownAs: ['', [Validators.required]],
        dateOfBirth: [null, [Validators.required]],
        city: ['', [Validators.required]],
        country: ['', [Validators.required]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(100)
          ]
        ],
        confirmPassword: ['', [Validators.required]]
      },
      {validator: this.passwordMatchValidator}
    );
  }
}
