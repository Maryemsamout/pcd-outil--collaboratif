import { Component,Input, OnInit } from '@angular/core';
import {Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
import { ServiceService } from '../Services/service.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { UpdateComponent } from '../update/update.component';
@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  @Input() idO!:number;
  info: any;
  active!: boolean;
  constructor(private api: ServiceService,
    private dialog: MatDialog) { }
    @Output() sidenavClose = new EventEmitter();
    hasBackdrop=true;
  ngOnInit(): void {
    this.getEtudiant()
  }
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
  currentStudent :any;
  getEtudiant(){
    this.api.getEtu(this.idO).subscribe(
      data => {
        this.currentStudent = data;
        console.log(this.currentStudent);
      },
      error => {
        console.log(error);
      });
  }
  simpleAlert(){
    Swal.fire('Hello Angular');
  }
  alertWithSuccess(){
    Swal.fire('Thank you...', 'You submitted succesfully!', 'success')
  }
  erroalert()
  {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href>Why do I have this issue?</a>'
    })
  }
  topend()
  {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
  }
  confirmBox(){
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }
  editClick(){
    const dialogConfig = new MatDialogConfig();
    //dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    this.dialog.open(UpdateComponent,dialogConfig);
  }
  editClicka(){
    const dialogConfig = new MatDialogConfig();
    //dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    this.dialog.open(UpdateComponent,{
      width:'1000px',
      height:'800px',
      data:{
        id:this.idO
      }
    });
  }
  closeClick2(){
    this.active=false;
  }
}
