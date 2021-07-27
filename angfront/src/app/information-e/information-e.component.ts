import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ServiceService } from '../Services/service.service';
import { UpdateEComponent } from '../update-e/update-e.component';

@Component({
  selector: 'app-information-e',
  templateUrl: './information-e.component.html',
  styleUrls: ['./information-e.component.css']
})
export class InformationEComponent implements OnInit {


  @Input() idO!:number;
  info: any;
  active!: boolean;

  constructor(private api: ServiceService,
              private dialog: MatDialog) { }
  @Output() sidenavClose = new EventEmitter();
  hasBackdrop=true;
  ngOnInit(): void {
    this.getEns()
  }
  currentEnseignant :any;
  getEns(){
    this.api.getest(this.idO).subscribe(
      (      data: any) => {
        this.currentEnseignant = data;
        console.log(this.currentEnseignant);
      },
      (      error: any) => {
        console.log(error);
      });
  }

  editClicka(){
    const dialogConfig = new MatDialogConfig();
    //dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    this.dialog.open(UpdateEComponent,{
      width:'1000px',
      height:'800px',
      data:{
        id:this.idO
      }
    });
  }

}
