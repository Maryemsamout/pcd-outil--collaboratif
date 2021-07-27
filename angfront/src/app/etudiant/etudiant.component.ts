import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../Services/service.service';
import {Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent implements OnInit {
  id: any;
  currentStudent: any;

  constructor(private api : ServiceService,
              private route:ActivatedRoute,
              private router: Router ) { }
  @Output() sidenavClose = new EventEmitter();
  hasBackdrop=true;
  EtudiantList:any = [];
  switcher="cours";
  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.refreshList();
  }

  refreshList() {
    this.api.getEtudiant().subscribe( data => {this.EtudiantList=data;
    });
    this.getEtudiant()
  }
  getEtudiant(){
    this.api.getEtu(this.id).subscribe(
      data => {
        this.currentStudent = data;
      },
      error => {
        console.log(error);
      });
  }
  public onSidenavClose = () => {
    //this.sidenavClose.emit();
    this.switcher="cours"
  }
  public onSidenavClose1 = () => {
    //this.sidenavClose.emit();
    this.switcher="question"
  }
  public onSidenavClose2 = () => {
    //this.sidenavClose.emit();
    this.switcher="mesQs"
  }
  public onSidenavClose3 = () => {
    // this.sidenavClose.emit();
     this.switcher="info"
   }
   public onSidenavClose4 = () => {
    // this.sidenavClose.emit();
     this.switcher="listetudiant"
   }
   public onSidenavClose5 = () => {
    // this.sidenavClose.emit();
     this.switcher="notification"
   }
   public onSidenavClose6 = () => {
    // this.sidenavClose.emit();
     this.switcher="mesCrs"
   }
    public onSidenavClose7 = () => {
    // this.sidenavClose.emit();
     this.switcher="tuto"
   }
   public onSidenavClose8 = () => {
    // this.sidenavClose.emit();
     this.switcher="listenseignant"
   }
}

