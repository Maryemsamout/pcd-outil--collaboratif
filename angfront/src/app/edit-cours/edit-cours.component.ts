import { Inject, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { number } from 'ngx-custom-validators/src/app/number/validator';
import Swal from 'sweetalert2';
import { MesCoursComponent } from '../mes-cours/mes-cours.component';
import { ServiceService } from '../Services/service.service';

@Component({
  selector: 'app-edit-cours',
  templateUrl: './edit-cours.component.html',
  styleUrls: ['./edit-cours.component.css']
})
export class EditCoursComponent implements OnInit {

  CoursId: any;
  CoursName: any;
  CoursDescri: any;
  CoursLevel: any;
  PhotoFileName: any;
  PhotoFilePath!: string;
  three=["II1","II2","II3"]
  @Input() idO!:number;
  injected: any;
  cours: any;
  selected: any;
  constructor(private service:ServiceService,
    public dialogRef: MatDialogRef<MesCoursComponent>,
      @Inject(MAT_DIALOG_DATA) public data:any) {this.injected=data }

  ngOnInit(): void {
    this.getCours()

  }
  updateCours(){
    var val=
    {
     CoursName:this.CoursName,
     CoursDescri:this.CoursDescri,
     CoursLevel:this.CoursLevel,
     PhotoFileName:this.PhotoFileName}

    this.service.updateCours(this.injected.id,val).subscribe(
      response => {
        console.log(response);
        Swal.fire('Your work has been saved !', 'Now click outside the box if you finished updating ', 'success');

      },
      error => {
        console.log(error);
      }
    );
  }
  uploadPhoto(event:any){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);
    this.service.UploadPhoto(formData).subscribe((data:any)=>{
      this.PhotoFileName=data.toString();
      this.PhotoFilePath=this.service.photoUrl+this.PhotoFileName;
    })
  }
  getCours(){
    this.service.getCours(this.injected.id)
      .subscribe(
        data => {
          this.cours = data;
          console.log(data);
          this.CoursName=data.CoursName;
          this.CoursDescri=data.CoursDescri;
          this.CoursLevel=data.CoursLevel;
          this.PhotoFileName=data.PhotoFileName;
        },
        error => {
          console.log(error);
        });
  }
  radioChangeHandler1(event: any) {
    this.selected = event.target.value;
    this.CoursLevel=this.selected;
  }
}
