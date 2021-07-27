import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import WebViewer from '@pdftron/webviewer'
import { CourseComponent } from '../course/course.component';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {

  pdfSrc="./assets/images/CdC.pdf"
  @ViewChild('viewer', { static: true }) viewer: ElementRef | undefined;
  name: any;
  constructor(public dialogRef: MatDialogRef<CourseComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) {this.name=data }

  ngOnInit(): void {
    WebViewer({
      path:'../assets/lib',
      initialDoc:"../assets/images/"+this.name.name
    },this.viewer.nativeElement).then((instance: any) => {

    });
  }


}
