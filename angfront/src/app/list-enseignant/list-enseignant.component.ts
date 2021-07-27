import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessageComponent } from '../message/message.component';
import { ServiceService } from '../Services/service.service';

@Component({
  selector: 'app-list-enseignant',
  templateUrl: './list-enseignant.component.html',
  styleUrls: ['./list-enseignant.component.css']
})
export class ListEnseignantComponent implements OnInit {

  @Input() idO!:number;
  ListEnseignant: any;
  MSearchE: any;
  searchTextE!: string;
  searchText: any;
  MSearch: any;

  constructor(private api: ServiceService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.liste()
  }
  liste() {
    this.api.getenseignant().subscribe( (data: any) => {
      this.ListEnseignant=data
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
    this.MSearch=this.ListEnseignant
    this.ListEnseignant=this.ListEnseignant.filter((res: { fullname: string; }) =>{
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
      this.MSearchE=this.ListEnseignant
      this.ListEnseignant=this.ListEnseignant.filter((res: { email: string; }) =>{
        // console.log(JSON.stringify(res));
        // let answer=JSON.stringify(res);
        return res.email.toLocaleLowerCase()
        .match(this.searchTextE.toLocaleLowerCase());

      })
    }
  }


}
