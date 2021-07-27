import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddCoursComponent } from '../add-cours/add-cours.component';
import { ServiceService } from '../Services/service.service';
import {
  saveAs as importedSaveAs
} from "file-saver";
import { PdfComponent } from '../pdf/pdf.component';

@Component({
  selector: 'app-cours-e',
  templateUrl: './cours-e.component.html',
  styleUrls: ['./cours-e.component.css']
})
export class CoursEComponent implements OnInit {

  @Input() idO!:number;
  courS: any;
  searchCours1: any;

  constructor(private service:ServiceService,  private dialog: MatDialog,private dialog1: MatDialog) {
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
    this.CoursList.reverse();})
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
 openCours(link:any){
  const dialogConfig = new MatDialogConfig();
  //dialogConfig.disableClose=true;
  dialogConfig.autoFocus=true;
  this.dialog1.open(PdfComponent,{
    width:'1000px',
    height:'1000px',
    data:{
      name:link
    }
  });
 }

}
