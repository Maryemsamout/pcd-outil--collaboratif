import { Component, Input, OnInit } from '@angular/core';
import {Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceService } from '../Services/service.service';
import { formatDate } from '@angular/common';
import { ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialogConfig } from '@angular/material/dialog';
import { ComentComponent } from '../coment/coment.component';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() idO!:number;

  currentDate = new Date();
  cValue = formatDate(this.currentDate, 'EEEE, MMMM d, y, h:mm a', 'en-US');
  idEtu=0;
  question = {
    idQuestion:0,
    question: '',
    questionKey:'',
    dateQuestion:this.cValue,
    image:'image.jpg',
    idEtudiant: this.idEtu,
  }
  currentQuestion: any;
  currentIndex: any;
  p!:number;
  currentStudent: any;
  currentStudentQ: any;

  constructor(private _snackBar: MatSnackBar,
    private api: ServiceService ,
    private router: Router, private route: ActivatedRoute,
    private dialog: MatDialog
   ) {}
  questions!:any[];
  hasBackdrop=true;
  totalLength!:number;
  page:number=1;
  commentaires!:any[];

  @Output() sidenavClose = new EventEmitter();

  ngOnInit(): void {
       this.retrieveQuestion();
       this.retrieveComment();
       this.getEtus();
       this.getEtudiant()
       this.getEtudiantQ(2)
  }
  currrentName:any;
  retrieveQuestion(){
   this.idEtu=this.idO;
   this.api.getQuestion()
   .subscribe(q =>{
   this.questions=q;
   this.questions.reverse();
   this.totalLength=this.questions.length;
  //  for(let elt in this.questions){
  //    for(let elt1 in this.EtudiantList){
  //     if(this.questions[elt].idEtudiant==this.EtudiantList[elt1].idEtudiant){
  //              this.currrentName=this.EtudiantList[elt1].fullname;
  //              console.log(this.currrentName);
  //     }
  //   }
  // }
   },(error)=>{
     console.log(error);
   })
    }
    lengthC=0
    commentToDisplay = [] as any;
  retrieveComment(){
      this.api.getComment()
       .subscribe(c =>{
       this.commentaires=c;
       },(error)=>{
         console.log(error);
       })
  }
  getNumber(id:any){
      this.commentToDisplay = this.commentaires.filter(comment => comment.idQuestion == id);
      this.lengthC=this.commentToDisplay.length
      return this.lengthC
  }
   public onSidenavClose = () => {
    this.sidenavClose.emit();
   }
//debut
displayComments = false
show=false

postToDisplay = {
    id: 0,
    title: "",
    body: ""
}
filename:string = "";
filepath:string ="";
titleToAdd = ""
bodyToAdd = ""
searchText = ""
commentText = ""
setActiveQuestion(question:any, index:any): void {
  this.currentQuestion = question;
  this.currentIndex = index;
}
saveQuestion(){
  const data = {
    question: this.question.question,
    questionKey:this.question.questionKey,
    dateQuestion: this.question.dateQuestion,
    image:this.question.image,
    idEtudiant:this.idO
  };

  this.api.addQuestion(data)
    .subscribe(
      response => {
        console.log(response);
        Swal.fire('Thank you...', 'You submitted succesfully!', 'success');
         this.question.question='';
         this.question.questionKey='';
         this.questions.push(data);
         this.retrieveQuestion
         this.questions=[data,...this.questions]
         console.log(data)
        // this.questions=this.questions.filter(q=>console.log(q))
        // window.location.reload()


      },
      error => {
        console.log(error);
      });
      this.retrieveQuestion()
      console.log(this.questions)

}
uploadPhoto(event:any){
  var file=event.target.files[0];
  const formData:FormData=new FormData();
  formData.append('uploadedFile',file,file.name);

  this.api.UploadPhoto(formData).subscribe((data:any)=>{
    this.filename=data.toString();
    this.filepath=this.api.photoUrl+this.filename;
  })
}
goBackToPosts() {
    this.commentToDisplay = []
    this.postToDisplay = {
        id: 0,
        title: "",
        body: ""
    }
    this.displayComments = false
}
showAddPostForm(){
    this.show=true;
}
deleteQ(id:any) {
  this.retrieveQuestion()
  this.commentaires.forEach((comment)=>
  {if (comment.idQuestion== id)
    this.api.deleteComment(comment.idComment).subscribe(
      response => {
        console.log(response)
      }
    )});

  this.api.deleteQuestion(id).subscribe(
    result=>{
      this._snackBar.open('Question Deleted', 'Success', {
        duration: 3000,
      });
      this.questions=this.questions.filter(q=>q.idQuestion!=id)
      //window.location.reload()
    },
    error=>console.log(error)
  )
}
getQuestion(id:any): void {
  this.api.get(id)
    .subscribe(
      data => {
        this.currentQuestion = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
}
questionsSearch!:any[] 
Search(){
  if(this.searchText==""){
    this.ngOnInit();
  }else{
    this.questionsSearch=this.questions
    this.questions=this.questions.filter(res =>{
      // console.log(JSON.stringify(res));
      // let answer=JSON.stringify(res);
      return res.questionKey.toLocaleLowerCase()
      .match(this.searchText.toLocaleLowerCase());

    })
  }
}
closeClick(){
  this.show=false;
}
openClick(item:any){
  //this.question=question;
    this.question=item;
    this.show=true;
}
 EtudiantList:any = [];
QsEt:any = [];
function(){
  //this.QsEt=this.questions.map(elt=>elt)
  // for (let i=0;i<this.questions.length;i++){
  //   for (let j=0;j<this.EtudiantList.length;j++){
  //     if (this.questions[i].idEtudiant==this.EtudiantList[j].idEtudiant){
  //       //this.QsEt=[{this.questions[i].idEtudiant,this.EtudiantList[j].fullname},...this.QsEt]
  //       console.log(this.questions[i].idEtudiant,this.EtudiantList[j].fullname)
  //     }
  //   }
  // }
  // this.questions.forEach(quest =>
  //                 this.EtudiantList.forEach(etud =>{
  //                   if (etud.idEtudiant==quest.idEtudiant){
  //                      this.QsEt=[quest.idEtudiant,etud.fullname]
  //                      console.log(this.QsEt)
  //                   }}))
  this.QsEt=this.questions.map(quest => this.EtudiantList.map((etud: { idEtudiant: any; }) =>
                               quest.idEtudiant==etud.idEtudiant))
                               console.log(this.QsEt)

}
name:any;
getEtus() {
    this.api.getEtudiant().subscribe( data => {
       this.EtudiantList=data;
      //  for(let elt in this.EtudiantList){
      //   if(this.EtudiantList[elt].idEtudiant==this.idO){
      //     const found=this.EtudiantList[elt].fullname
      //     this.name=found
      //   }
      // }
     } );
}
getEtudiant(){

  this.api.getEtu(this.idO).subscribe(
    data => {
      this.currentStudent = data;
      console.log(this.currentStudent);
    },
    error => {
      console.log(error);
    });
}
getEtudiantQ(id:any){
  // this.currentStudentQ = this.EtudiantList.filter(student => {student.idEtudiant == id;
  //                                                             console.log(student)});
  // return this.currentStudentQ.fullname;
  this.api.getEtu(id).subscribe(
    data => {
      this.currentStudentQ = data;
      console.log(this.currentStudentQ.fullname);
      return this.currentStudentQ.fullname
    },
    error => {
      console.log(error);
    });

}
confirmBox(id:any){
  Swal.fire({
    title: 'Are you sure want to remove?',
    text: 'You will not be able to recover this file!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.value) {
      this.retrieveQuestion()
  this.commentaires.forEach((comment)=>
  {if (comment.idQuestion== id)
    this.api.deleteComment(comment.idComment).subscribe(
      response => {
        console.log(response)
      }
    )});

  this.api.deleteQuestion(id).subscribe(
    result=>{
      this.questions=this.questions.filter(q=>q.idQuestion!=id)
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
commentClick(){
  const dialogConfig = new MatDialogConfig();
  //dialogConfig.disableClose=true;
  dialogConfig.autoFocus=true;
  this.dialog.open(ComentComponent,dialogConfig);
}
editClick(idQ:any){
  const dialogConfig = new MatDialogConfig();
  //dialogConfig.disableClose=true;
  dialogConfig.autoFocus=true;
  this.dialog.open(ComentComponent,{
    width:'1000px',
    height:'800px',
    data:{
      id:idQ,
      ide:this.idO
    }
  });
}
}
