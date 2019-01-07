import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // ================================================
  // =              ATTRIBUTES SECTION              =
  // ================================================

  @Input()
  valuesFormHome: any;

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

  constructor() { }

  ngOnInit() {
  }


  // ================================================
  // =              BUSINESS METHODS                =
  // ================================================

  register() {

  }

  cancel() {
    this.canceled.emit(false);
  }
}
