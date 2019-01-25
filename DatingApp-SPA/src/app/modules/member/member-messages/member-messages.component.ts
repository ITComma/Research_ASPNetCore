import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/core/models/message';
import { UserService } from 'src/app/core/services/user.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { AlertifyService } from 'src/app/core/services/alertify.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {

  // ==========================================
  // =           Attributes Section           =
  // ==========================================

  @Input() recipientId: number;
  messages: Message[];

  newMessage: any = {};


  // ==========================================
  // =          Constructors Section          =
  // ==========================================

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.userService.getMessageThread(this.authService.decodedToken.nameid, this.recipientId).subscribe(
      messages => {
        this.messages = messages;
      }, error => {
        this.alertify.error(error);
      }
    );
  }

  // ==========================================
  // =             Events Section             =
  // ==========================================

  sendMessage() {
    this.newMessage.recipientId = this.recipientId;
    this.userService.sendMessage(this.authService.decodedToken.nameid, this.newMessage).subscribe(
      (message: Message) => {
        this.messages.unshift(message);
        this.newMessage.content = '';
      }, error => {
        this.alertify.error(error);
      }
    );
  }

}
