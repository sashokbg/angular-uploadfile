import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private httpClient: HttpClient) {
  }


  file: any;
  fileProgress: string;
  uploadedPercentage: number;

  ngOnInit(): void {

  }

  setFile($event: any) {
    console.log('Event', $event.target.files[0]);
    this.file = $event.target.files[0];
  }

  upload() {
    console.log('Uploading file', this.file);
    const formData = new FormData();
    formData.append('file', this.file);

    this.httpClient.post(`http://localhost:3000/upload-file`, formData, {reportProgress: true, observe: 'events'})
      .subscribe((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              this.fileProgress = '0%';
              break;
            case HttpEventType.Response:
              this.fileProgress = '100%';
              break;
            case HttpEventType.UploadProgress: {
              if (Math.round(this.uploadedPercentage) !== Math.round(event['loaded'] / event['total'] * 100)) {
                this.uploadedPercentage = event.loaded / event.total * 100;
                this.fileProgress = `${Math.round(this.uploadedPercentage)}%`;
              }
              break;
            }
          }
        },
        error => {
          console.log(error);
          this.fileProgress = 'Problème lors de l\'envoi des fichiers';
        });
  }
}

