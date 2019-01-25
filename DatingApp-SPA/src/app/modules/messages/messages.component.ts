import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/core/models/message';
import { Pagination, PaginatedResult } from 'src/app/core/models/pagination';
import { UserService } from 'src/app/core/services/user.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/alertify.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  // ==========================================
  // =           Attributes Section           =
  // ==========================================

  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';

  // ==========================================
  // =          Constructors Section          =
  // ==========================================

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });
  }

  // ==========================================
  // =             Events Section             =
  // ==========================================

  loadMessages(messageContainer?: string) {
    if (messageContainer != null) {
      this.messageContainer = messageContainer;
      console.log(messageContainer);
    }

    this.userService
      .getMessages(
        this.authService.decodedToken.nameid,
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.messageContainer
      )
      .subscribe(
        (res: PaginatedResult<Message[]>) => {
          this.messages = res.result;
          this.pagination = res.pagination;
        },
        error => {
          this.alertify.error(error);
        }
      );
  }

  pageChanged(event: any) {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }
}
