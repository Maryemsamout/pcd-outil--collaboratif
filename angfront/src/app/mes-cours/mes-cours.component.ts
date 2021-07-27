import { Component, Input, OnInit } from '@angular/core';
import {Output, EventEmitter } from '@angular/core';
import { ServiceService } from '../Services/service.service';
import {
  saveAs as importedSaveAs
} from "file-saver";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddCoursComponent } from '../add-cours/add-cours.component';
import { EditCoursComponent } from '../edit-cours/edit-cours.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-mes-cours',
  templateUrl: './mes-cours.component.html',
  styleUrls: ['./mes-cours.component.css']
})
export class MesCoursComponent implements OnInit {
  
  @Input() idO!:number;
  courS: any;
  searchCours1: any;

  constructor(private service:ServiceService,  private dialog: MatDialog) {
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }
   }
  @Output() sidenavClose = new EventEmitter();
  hasBackdrop=true;
  ngOnInit(): void {
     this.refreshCoursList();
     this.totalLength=this.CoursList.length
     console.log(this.CoursList)
  }
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
  searchCours!: string;
  CoursName: any;
  coursSearch: any;
  page:any;
  totalLength:any;
  CoursDate:any;

  collection :any=[];

  ShareService: any;
  uploader: any;

  rundata: any;
  PhotoFileName: any;

  CoursList:any= [];
  crs!:any;


  refreshCoursList() {
    this.service.getCoursList().subscribe(data=>{
      this.CoursList=data;
      this.CoursList=this.CoursList.filter((cours: { idEtudiant: number; })=>cours.idEtudiant==this.idO)
      this.CoursList.reverse();
    })
    this.totalLength=this.CoursList.length
  }

  deleteClick(item:any){
   if (confirm('are yousure ??')){
   this.service.deleteCours(item.CoursId).subscribe((data: { toString: () => any; })=>{
    alert(data.toString());
    this.refreshCoursList();
  })
}
  }
  deleteCrs(id:any) {
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this Course!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
      this.service.deleteCours(id).subscribe(
        result=>{
        this.CoursList=this.CoursList.filter((q: { CoursId: any; })=>q.CoursId!=id)
      },
      error=>console.log(error)
      )
        Swal.fire(
          'Deleted!',
          'This Course has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Course is safe :)',
          'error'
        )
      }
    })
  }

  SearchCours(){
    if(this.searchCours==""){
      this.ngOnInit();
    }else{
      this.CoursList=this.CoursList.filter((res: { CoursName: string; }) =>{
        return res.CoursName.toLocaleLowerCase()
        .match(this.searchCours.toLocaleLowerCase());
      })
    }
  }

  downloadfile(CoursList:any) {
    this.PhotoFileName = CoursList.PhotoFileName;
   // var DocFile = this.PhotoFileName.slice(0, -5);
    this.service.downloadFile(this.PhotoFileName).subscribe((CoursList: string | Blob) => {
        importedSaveAs(CoursList)
    });
 }

addCours(){
  const dialogConfig = new MatDialogConfig();
  //dialogConfig.disableClose=true;
  dialogConfig.autoFocus=true;
  this.dialog.open(AddCoursComponent,{
    width:'700px',
    height:'700px',
    data:{
      ide:this.idO
    }
  });
 }
 editClick(id:any){
  const dialogConfig = new MatDialogConfig();
  //dialogConfig.disableClose=true;
  dialogConfig.autoFocus=true;
  this.dialog.open(EditCoursComponent,{
    width:'700px',
    height:'700px',
    data:{
      id:id,
      ide:this.idO
    }
  });
 }
 SearchCours1(){
  if(this.searchCours1==""){
    this.ngOnInit();
  }else{
    this.CoursList=this.CoursList.filter((res: { CoursLevel: string; }) =>{
      return res.CoursLevel.toLocaleLowerCase()
      .match(this.searchCours1.toLocaleLowerCase());
    })
  }
}
}
