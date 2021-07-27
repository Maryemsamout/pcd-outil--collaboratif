import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessageComponent } from '../message/message.component';
import { ServiceService } from '../Services/service.service';

import {Router} from "@angular/router";

@Component({
  selector: 'app-list-etudiant',
  templateUrl: './list-etudiant.component.html',
  styleUrls: ['./list-etudiant.component.css']
})
export class ListEtudiantComponent implements OnInit {

  @Input() idO!:number;
  searchText!: string;
  MSearch: any; 
  searchTextE!: string;
  MSearchE: any;


  constructor(private api:ServiceService,
             private dialog: MatDialog,
             private router: Router,) { }

             ngOnInit(): void {
              this.liste()
            }
          
            listEtudiant:any;
          
            liste() {
                this.api.getEtudiant().subscribe( data => {
                  this.listEtudiant=data
                 } );
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
           sendMsg(id:any){
            const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose=true;
            dialogConfig.autoFocus=true;
            this.dialog.open(MessageComponent,{
              width:'1100px',
              height:'900px',
              data:{
                id:id,
                idE:this.idO
              }
            });
           }
           Search(){
            if(this.searchText==""){
              this.ngOnInit();
            }else{
              this.MSearch=this.listEtudiant
              this.listEtudiant=this.listEtudiant.filter((res: { fullname: string; }) =>{
                // console.log(JSON.stringify(res));
                // let answer=JSON.stringify(res);
                return res.fullname.toLocaleLowerCase()
                .match(this.searchText.toLocaleLowerCase());
          
              })
            }
            }
          SearchE(){
              if(this.searchTextE==""){
                this.ngOnInit();
              }else{
                this.MSearchE=this.listEtudiant
                this.listEtudiant=this.listEtudiant.filter((res: { email: string; }) =>{
                  // console.log(JSON.stringify(res));
                  // let answer=JSON.stringify(res);
                  return res.email.toLocaleLowerCase()
                  .match(this.searchTextE.toLocaleLowerCase());
          
                })
              }
            }
          
}
