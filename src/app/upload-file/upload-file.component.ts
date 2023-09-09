import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Uploader, UploadWidgetConfig, UploadWidgetResult } from 'uploader';
import { UploaderModule } from 'angular-uploader';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [CommonModule, UploaderModule],
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent {
  uploader = Uploader({ apiKey: "public_W142iDLbbFmk1h9jhPA4oac3tJcj" }); // Your real API key.
  options: UploadWidgetConfig = {
    multi: true,
    maxFileSizeBytes: 100000
  };
  onUpdate = (files: UploadWidgetResult[]) => {
    files.map(x => x.fileUrl).join("\n");
    console.log(files.map(x => x.fileUrl));
    
  };
  width = "600px";
  height = "375px";
}
