import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../Services/service.service';

@Component({
  selector: 'app-enseignant',
  templateUrl: './enseignant.component.html',
  styleUrls: ['./enseignant.component.css']
})
export class EnseignantComponent implements OnInit {

  id: any;
  CurrentEnseignant: any;

  constructor(private api : ServiceService,
              private route:ActivatedRoute,
              private router: Router ) { }
  @Output() sidenavClose = new EventEmitter();
  hasBackdrop=true;
  EnseignantList:any = [];
  switcher="cours";
  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.refreshList();
  }

  refreshList() {
    this.api.getenseignant().subscribe( data => {this.EnseignantList=data;
    });
    this.getEns()
  }
  getEns(){
    this.api.getent(this.id).subscribe(
      (      data: any) => {
        this.CurrentEnseignant = data;
      },
      (      error: any) => {
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
  public onSidenavClose3 = () => {
    // this.sidenavClose.emit();
     this.switcher="info"
   }
   public onSidenavClose4 = () => {
    // this.sidenavClose.emit();
     this.switcher="listetudiant"
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
   public onSidenavClose5 = () => {
    // this.sidenavClose.emit();
     this.switcher="exercice"
   }


}
