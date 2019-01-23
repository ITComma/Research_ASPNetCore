import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {

  // ==========================================
  // =           Attributes Section           =
  // ==========================================

  @Input()
  user: User;

  // ==========================================
  // =          Constructors Section          =
  // ==========================================

  constructor() { }

  ngOnInit() {
  }

}
