import { Component, Input, OnInit } from '@angular/core';
import {Output, EventEmitter } from '@angular/core';
import { ServiceService } from '../Services/service.service';
import {
  saveAs as importedSaveAs
} from "file-saver";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddExerciceEComponent } from '../add-exercice-e/add-exercice-e.component';
import { PdfComponent } from '../pdf/pdf.component';

@Component({
  selector: 'app-exerciceb',
  templateUrl: './exerciceb.component.html',
  styleUrls: ['./exerciceb.component.css']
})
export class ExercicebComponent implements OnInit {

  @Input() idO!:number;
  exerciceS: any;
  searchExercice1: any;
  PhotoFilePath!:string;
  currentStudent: any;
  currentEnseignant: any;
  constructor(private service:ServiceService,  private dialog: MatDialog,  private dialog1: MatDialog) {
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }
   }
  @Output() sidenavClose = new EventEmitter();
  hasBackdrop=true;
  ngOnInit(): void {
     this.refreshExerciceList();
     this.totalLength=this.ExerciceList.length
     console.log(this.ExerciceList)
  }
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
  searchExercice!: string;
  ExerciceName: any;
  exerciceSearch: any;
  page:any;
  totalLength:any;
  ExerciceDate:any;

  collection :any=[];

  ShareService: any;
  uploader: any;

  rundata: any;
  PhotoFileName: any;

  ExerciceList:any= [];
  exe!:any;


  refreshExerciceList() {
    this.service.getExerciceList().subscribe(data=>{
    this.ExerciceList=data;
    console.log(this.ExerciceList);
    this.ExerciceList.reverse();})
    console.log(this.ExerciceList)
    this.totalLength=this.ExerciceList.length
    this.getEns()
  }

  deleteClick(item:any){
   if (confirm('are yousure ??')){
   this.service.deleteExercice(item.ExerciceId).subscribe((data: { toString: () => any; })=>{
    alert(data.toString());
    this.refreshExerciceList();
  })
}
  }

  SearchExercice(){
    if(this.searchExercice==""){
      this.ngOnInit();
    }else{
      this.ExerciceList=this.ExerciceList.filter((res: { ExerciceName: string; }) =>{
        return res.ExerciceName.toLocaleLowerCase()
        .match(this.searchExercice.toLocaleLowerCase());
      })
    }
  }
  SearchExercice1(){
    if(this.searchExercice1==""){
      this.ngOnInit();
    }else{
      this.ExerciceList=this.ExerciceList.filter((res: { ExerciceLevel: string; }) =>{
        return res.ExerciceLevel.toLocaleLowerCase()
        .match(this.searchExercice1.toLocaleLowerCase());
      })
    }
  }

  downloadfile(ExerciceList:any) {
    this.PhotoFileName = ExerciceList.PhotoFileName;
   // var DocFile = this.PhotoFileName.slice(0, -5);
    this.service.downloadFile(this.PhotoFileName).subscribe((ExerciceList: string | Blob) => {
        importedSaveAs(ExerciceList)
    });
 }
 getEns(){

  this.service.getest(this.idO).subscribe(
    (    data: any): void => {
      this.currentEnseignant = data;
      console.log(this.currentEnseignant);
    },
    (    error: any) => {
      console.log(error);
    });
}
addExercice(){
  const dialogConfig = new MatDialogConfig();
  //dialogConfig.disableClose=true;
  dialogConfig.autoFocus=true;
  this.dialog.open(AddExerciceEComponent,{
    width:'700px',
    height:'700px',
    data:{
      ide:this.idO,
      name:this.currentEnseignant.fullname
    }
  });
 }
 openEx(link: any){
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
