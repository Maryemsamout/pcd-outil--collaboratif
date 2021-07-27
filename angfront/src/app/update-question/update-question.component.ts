import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MesQuestionsComponent } from '../mes-questions/mes-questions.component';
import { ServiceService } from '../Services/service.service';
@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {

  datainjected: any;
  question={
    questionKey:'',
    question:''
  }
  currentDate = new Date();
  cValue = formatDate(this.currentDate, 'EEEE, MMMM d, y, h:mm a', 'en-US');

  oldQuestion:any;
  constructor(private api: ServiceService,
    public dialogRef: MatDialogRef<MesQuestionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) {this.datainjected=data }

  ngOnInit(): void {
    this.getQuestion()
  }
  getQuestion(){
    this.api.get(this.datainjected.id).subscribe(
      data => {
        this.oldQuestion = data;
        this.question.questionKey=this.oldQuestion.questionKey;
        this.question.question=this.oldQuestion.question;
      },
      error => {
        console.log(error);
      });
  }
  updateQuestion(): void {
    const data = {
      idQuestion:this.oldQuestion.idQuestion,
      question: this.question.question,
      questionKey:this.question.questionKey,
      dateQuestion:this.cValue,
      image:this.oldQuestion.image,
      idEtudiant: this.oldQuestion.idEtudiant,
    };
    this.api.updateQs(this.datainjected.id,data)
      .subscribe(
        response => {
          console.log(response);
          Swal.fire('Your work has been saved !', 'Now click outside the box if you finished updating ', 'success');

        },
        error => {
          console.log(error);
        });
  }

}
