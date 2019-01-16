import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {

  // ================================================
  // =              ATTRIBUTES SECTION              =
  // ================================================

  values: any;


  // ================================================
  // =             CONSTRUCTOR SECTION              =
  // ================================================

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getValues();
  }


  // ================================================
  // =              BUSINESS METHODS                =
  // ================================================

  private getValues() {
    this.http.get('http://localhost:5000/api/values')
      .subscribe(
        (response) => {
          this.values = response;
        },
        (error) => {
          console.log(error);
        }
      );
  }

}
