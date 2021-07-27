import { Inject, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../Services/service.service';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { concat } from  'rxjs';
import { formatDate } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExercicebComponent } from '../exerciceb/exerciceb.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-exercice-e',
  templateUrl: './add-exercice-e.component.html',
  styleUrls: ['./add-exercice-e.component.css']
})
export class AddExerciceEComponent implements OnInit {

  [x: string]: any;
  niv:any;
  three=["II1","II2","II3"];

  currentDate = new Date();
  cValue = formatDate(this.currentDate, 'EEEE, MMMM d, y, h:mm a', 'en-US')

  injectedData:any;

    constructor(private service:ServiceService,
      public dialogRef: MatDialogRef<ExercicebComponent>,
      @Inject(MAT_DIALOG_DATA) public data:any) {this.injectedData=data }
     @Input() idO:any;

    ExerciceId!:number;
    ExerciceName!:string;
    ExerciceLevel!:string;
    ExerciceDate!:string;
    PhotoFileName!:string;

    PhotoFilePath!:string;
    public uploader: FileUploader = new FileUploader({});
    public hasBaseDropZoneOver: boolean = false;

  fileOverBase(event:any):  void {
      this.hasBaseDropZoneOver  =  event;
  }
  getFiles(): FileLikeObject[] {
    return this.uploader.queue.map((fileItem: { file: any; }) => {
      return fileItem.file;
    });
  }
  upload() {
    let files = this.getFiles();
    console.log(files);
    let requests: any[] = [];
    files.forEach((file) => {
      let formData = new FormData();
      formData.append('file' , file.rawFile, file.name);
      requests.push(this.ShareService.upload(formData));
    });

    concat(...requests).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
    ngOnInit(): void {
    }
  addExercice(){
                var val={
                     idEtudiant:this.injectedData.ide,
                     ExerciceName:this.ExerciceName+" , Added by Mr/Mlle : "+this.injectedData.name,
                     ExerciceLevel:this.ExerciceLevel,
                     ExerciceDate:this.cValue,
                     PhotoFileName:this.PhotoFileName
                };
                     this.service.addExercice(val).subscribe(((res: { toString: () => any; })=>{console.log(res.toString());
                     Swal.fire('Thank you...', 'You submitted succesfully!', 'success');}

  ));}
  updateExercice(){
    var val=
    {
      ExerciceName:this.ExerciceName,
      ExerciceLevel:this.ExerciceLevel,
      PhotoFileName:this.PhotoFileName}

    this.service.updateExercice(this.ExerciceId,val).subscribe(((res: { toString: () => any; })=>{alert(res.toString());}));
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
  radioChangeHandler1(event: any) {
    this.selected = event.target.value;
    this.ExerciceLevel=this.selected;
  }
}
