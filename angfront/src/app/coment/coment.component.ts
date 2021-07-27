import { formatDate } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import { QuestionComponent } from '../question/question.component';
import { ServiceService } from '../Services/service.service';

@Component({
  selector: 'app-coment',
  templateUrl: './coment.component.html',
  styleUrls: ['./coment.component.css']
})
export class ComentComponent implements OnInit {
  commentToDisplay!: any[];
  postToDisplay!: {  };
  id: any;
  currentQuestion: any;
  @Input() idO!:number;
  qst: any;
  qstID: any;
  qsst: any;
  qstKey: any;
  dateqst: any;
  image: any;
  idEtu: any;


  currentDate = new Date();
  cValue = formatDate(this.currentDate, ' EEEE, MMMM d, y, h:mm a', 'en-US');

  comment={
      idQuestion: 1,
      idEtudiant: 1,
      dateComment: this.cValue,
      comment: ""
  }
  comments!:any[];
   idQues: any
  constructor(private router: Router,
              private route:ActivatedRoute,
              private api : ServiceService,
              private _snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<QuestionComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any
             ) { this.idQues = data}
  displayComments = true
  hasBackdrop=true;


  @Output() sidenavClose = new EventEmitter();
  ngOnInit(): void {
    this.retrieveComment()
    this.getQuestion();
  }
  // getComments() {
  //   this.displayComments = true
  //   this.commentToDisplay = this.comments.filter(comment => comment.idQuestion == this.id);
  //   console.log(this.commentToDisplay)
  //   let tempPost = this.comments.find(post => post.idQuestion == this.id);
  //   this.postToDisplay = tempPost
  // }
  lengthC=0
  page:number=1;
  retrieveComment(){
    this.api.getComment()
     .subscribe(c =>{
     this.comments=c;
     this.comments.reverse();
    //  console.log(this.comments);
     this.displayComments = true
     this.commentToDisplay = this.comments.filter(comment => comment.idQuestion == this.idQues.id);
    //console.log(this.commentToDisplay)
     this.lengthC=this.commentToDisplay.length
     },(error)=>{
       console.log(error);
     })

  }
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
  goBack() {
    this.displayComments = false
    // this.router.navigate(['/etudiant/'+this.idO+'/question'])
    //this.router.navigate(['/etudiant/'+this.idO])
  }
  getQuestion(): void {
    this.api.get(this.idQues.id)
      .subscribe(
        data => {
          this.qst = data;
          console.log(this.qst)
        },
        error => {
          console.log(error);
        });
  }
  saveComment(){
    const data = {
      idQuestion:this.idQues.id,
      idEtudiant:this.idQues.ide,
      dateComment: this.cValue,
      comment: this.idQues.name +" : "+ this.comment.comment
    };

    this.api.addcomment(data)
      .subscribe(
        response => {
          console.log(response);
          // this._snackBar.open('Published Successfully', 'Success', {
          //    duration: 2000,
          //  });
          Swal.fire('Thank you...', 'You submitted succesfully!', 'success');

           this.comment.comment='';
           this.comments.push(data);
           this.retrieveComment()
           this.comments=[data,...this.comments]

          // window.location.reload()
        },
        error => {
          console.log(error);
        });
  }
}

