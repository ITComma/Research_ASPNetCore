import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from 'src/app/core/models/photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { AlertifyService } from 'src/app/core/services/alertify.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  // ================================================
  // =              ATTRIBUTES SECTION              =
  // ================================================

  @Input()
  photos: Photo[];

  currentMainPhoto: Photo;

  baseUrl = environment.apiUrl;

  uploader: FileUploader;

  hasBaseDropZoneOver = false;

  // ================================================
  // =             CONSTRUCTOR SECTION              =
  // ================================================

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.initializeUploader();
  }

  // ================================================
  // =                EVENT SECTION                 =
  // ================================================

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  setMainPhoto(photo: Photo) {
    this.userService
      .setMainPhoto(this.authService.decodedToken.nameid, photo.id)
      .subscribe(
        () => {
          this.alertify.success('The photo successfully set to main');
          this.currentMainPhoto = this.photos.filter(p => p.isMain === true)[0];
          this.currentMainPhoto.isMain = false;
          photo.isMain = true;

          this.authService.changeUserPhoto(photo.url);
        },
        error => {
          this.alertify.error(error);
        }
      );
  }

  deletePhoto(id: number) {
    this.alertify.confirm('Are you sure you want to delete this photo?', () => {
      this.userService
        .deletePhoto(this.authService.decodedToken.nameid, id)
        .subscribe(
          () => {
            this.photos.splice(this.photos.findIndex(p => p.id === id), 1);
          },
          error => {
            this.alertify.error('Failed to delete the photo');
          }
        );
    });
  }

  private initializeUploader() {
    this.uploader = new FileUploader({
      url:
        this.baseUrl +
        'users/' +
        this.authService.decodedToken.nameid +
        '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1020 * 1024
    });

    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);

        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };

        this.photos.push(photo);

        if (photo.isMain) {
          this.authService.changeUserPhoto(photo.url);
        }
      }
    };
  }
}
