import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { InformationComponent } from '../information/information.component';
import { ServiceService } from '../Services/service.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  @Input() idO!:number;
  etudiant={
  cin:"",
  fullname:"",
  email:"",
  birthDate:"",
  password:"",
  level:"",
  }
  three=["II1","II2","II3"]
  currentStudent: any;
  selected: any;
  nivValue: any;
  datainjected:any
  constructor(private api: ServiceService,
    public dialogRef: MatDialogRef<InformationComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) {this.datainjected=data }

  ngOnInit(): void {
    this.getEtudiant()
    this.selected=this.etudiant.level
  }
  getEtudiant(){
    this.api.getEtu(this.datainjected.id).subscribe(
      data => {
        this.currentStudent = data;
        this.etudiant.cin=this.currentStudent.cin;
        this.etudiant.fullname=this.currentStudent.fullname;
        this.etudiant.email=this.currentStudent.email;
        this.etudiant.birthDate=this.currentStudent.birthDate;
        this.etudiant.password=this.currentStudent.password;
        this.etudiant.level=this.currentStudent.level;
      },
      error => {
        console.log(error);
      });
  }
  updateEtudiant(): void {
    const data = {
      cin: this.etudiant.cin,
      fullname:this.etudiant.fullname,
      email: this.etudiant.email,
      birthDate:this.etudiant.birthDate,
      password:this.etudiant.password,
      level: this.etudiant.level,

    };
    this.api.updateEtu(this.datainjected.id,data)
      .subscribe(
        response => {
          console.log(response);
          Swal.fire('Your work has been saved !', 'Now click outside the box if you finished updating ', 'success');

        },
        error => {
          console.log(error);
        });
  }
  radioChangeHandler(event: any) {
    this.selected = event.target.value;
    this.nivValue = event.target.value;
    this.etudiant.level=this.selected;
  }
}
