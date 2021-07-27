import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../Services/service.service';
import {Input} from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { MatDialogConfig,MatDialog } from '@angular/material/dialog';
import { ComentComponent } from '../coment/coment.component';
import { UpdateQuestionComponent } from '../update-question/update-question.component';
@Component({
  selector: 'app-mes-questions',
  templateUrl: './mes-questions.component.html',
  styleUrls: ['./mes-questions.component.css']
})
export class MesQuestionsComponent implements OnInit {

  hasBackdrop!:true;
  questions: any;
  totalLength: any;
  commentaires: any;
  commentToDisplay: any;
  lengthC: any;
  searchText!: string;
  page:number=1;
  questionsSearch!:any[]
  @Input() idO!:number;
  constructor(private route: ActivatedRoute,
              private api : ServiceService,
              private _snackBar: MatSnackBar,
              private dialog: MatDialog) { }
 // @Output() sidenavClose = new EventEmitter();


  ngOnInit(): void {
    //this.id=this.route.snapshot.params['id'];
    this.retrieveQuestion()
    this.retrieveComment();
    // this.api.changeID(this.id)
    // this.api.currentID.subscribe(q => console.log(q))
  }
  // public onSidenavClose = () => {
  //   this.sidenavClose.emit();
  // }
  comments=false;
  GoToComment(){
     this.comments=true;
  }
  retrieveQuestion(){
    this.api.getQuestion()
     .subscribe(q =>{
     this.questions=q;
     this.questions.reverse();
     this.questions=this.questions.filter((q: { idEtudiant: number; })=>q.idEtudiant==this.idO)
    //  console.log(this.questions)
     this.totalLength=this.questions.length;
     },(error)=>{
       console.log(error);
     })
  }
  retrieveComment(){
    this.api.getComment()
     .subscribe(c =>{
     this.commentaires=c;
     },(error)=>{
       console.log(error);
     })
}
  deleteQ(id:any) {

    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this Question!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.retrieveQuestion()
    this.commentaires.forEach((comment:any)=>
    {if (comment.idQuestion== id)
      this.api.deleteComment(comment.idComment).subscribe(
        response => {
          console.log(response)
        }
      )});

    this.api.deleteQuestion(id).subscribe(
      result=>{
        this.questions=this.questions.filter((q: { idQuestion: any; })=>q.idQuestion!=id)
        //window.location.reload()
      },
      error=>console.log(error)
    )
        Swal.fire(
          'Deleted!',
          'Your Question has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Question is safe :)',
          'error'
        )
      }
    })
  }
  getNumber(id:any){
    this.commentToDisplay = this.commentaires.filter((comment: { idQuestion: any; }) => comment.idQuestion == id);
    this.lengthC=this.commentToDisplay.length
    return this.lengthC
  }
  Search(){
  if(this.searchText==""){
    this.ngOnInit();
  }else{
    this.questionsSearch=this.questions
    this.questions=this.questions.filter((res: { questionKey: string; }) =>{
      // console.log(JSON.stringify(res));
      // let answer=JSON.stringify(res);
      return res.questionKey.toLocaleLowerCase()
      .match(this.searchText.toLocaleLowerCase());

    })
  }
 }
 editClick(idQ:any){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose=true;
  dialogConfig.autoFocus=true;
  this.dialog.open(ComentComponent,{
    width:'1100px',
    height:'900px',
    data:{
      id:idQ,
      ide:this.idO
    }
  });
 }
 update(idQ:any){
  const dialogConfig = new MatDialogConfig();
  //dialogConfig.disableClose=true;
  dialogConfig.autoFocus=true;
  this.dialog.open(UpdateQuestionComponent,{
    width:'900px',
    height:'500px',
    data:{
      id:idQ
    }
  });
}
}
