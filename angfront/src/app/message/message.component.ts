import { Inject, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListEtudiantComponent } from '../list-etudiant/list-etudiant.component';
import { ServiceService } from '../Services/service.service';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() idO!:number;
  ids: any;
  messages: any;
  message={
    idEtudiantS:0,
    fullnameS:"",
    idEtudiantR:0,
    fullnameR:"",
    message:"",
    seen:false
  }
  currentStudent: any;
  currentStudentE: any;

  constructor(public dialogRef: MatDialogRef<ListEtudiantComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private api: ServiceService) { this.ids=data }

  ngOnInit(): void {
    this.getMessage()
    this.getEtudiant()
    this.getEtudiantS()
  }
  getMessage() {
    this.api.getMessage().subscribe( data => {
      this.messages=data
      console.log(this.messages)
     } );
  }
  getEtudiant(){
    this.api.getEtu(this.ids.id).subscribe(
      data => {
        this.currentStudent = data;
      },
      error => {
        console.log(error);
      });
  }
  getEtudiantS(){
    this.api.getEtu(this.ids.idE).subscribe(
      data => {
        this.currentStudentE = data;
      },
      error => {
        console.log(error);
      });
  }
  SendMsg(){
    const data = {
      idEtudiantS:this.ids.id,
      fullnameS:this.currentStudentE.fullname,
      idEtudiantR:this.ids.idE,
      fullnameR:this.currentStudent.fullname,
      message:this.message.message,
      seen:this.message.seen
    };
    this.api.addMessage(data)
      .subscribe(
        response => {
           this.message.message='';
           this.messages.push(data);
        },
        error => {
          console.log(error);
        });
  }
 updateMsg(id:any){
   const data ={
     seen:true
   };
   this.api.updateMsg(id,data).subscribe(
    rep=>{console.log(rep);},
    error => {
      console.log(error);
    })
 }


}
