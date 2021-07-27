import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from '@syncfusion/ej2-angular-calendars';
import { AddCoursComponent } from './add-cours/add-cours.component';
import { AddExerciceComponent } from './add-exercice/add-exercice.component';

import { AjoutfComponent } from './ajoutf/ajoutf.component';
import { ComentComponent } from './coment/coment.component';
import { CourseComponent } from './course/course.component';
import { EditCoursComponent } from './edit-cours/edit-cours.component';
import { EditExerciceComponent } from './edit-exercice/edit-exercice.component';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { ExerciceComponent } from './exercice/exercice.component';
import { FormationComponent } from './formation/formation.component';
import { HomeComponent } from './home/home.component';
import { InformationComponent } from './information/information.component';
import { ListEtudiantComponent } from './list-etudiant/list-etudiant.component';
import { LoginComponent } from './login/login.component';
import { MesCoursComponent } from './mes-cours/mes-cours.component';
import { MesExerciceComponent } from './mes-exercice/mes-exercice.component';
import { MesQuestionsComponent } from './mes-questions/mes-questions.component';
import { MessageComponent } from './message/message.component';
import { NotificationComponent } from './notification/notification.component';
import { QuestionComponent } from './question/question.component';
import { RegisterComponent } from './register/register.component';
import { TutorialsComponent } from './tutorials/tutorials.component';
import { UpdateQuestionComponent } from './update-question/update-question.component';
import { UpdateComponent } from './update/update.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
 
 { path: 'etudiant', component: EtudiantComponent},
 {
  path: 'etudiant/:id',
  component: EtudiantComponent,
  children: [
    { path: 'mesquestion', component: MesQuestionsComponent },
    { path: 'formation/:id', component: FormationComponent },
    // { path: 'course', component: CourseComponent },
    { path: 'mesquestion', component: MesQuestionsComponent },
    { path: 'listetudiant', component: ListEtudiantComponent },
    { path: 'editcours', component: EditCoursComponent },
    { path: 'mescours', component: MesCoursComponent },
    { path: 'course', component: CourseComponent },
    { path: 'addcourse', component: AddCoursComponent },
    { path: 'question',component: QuestionComponent },
    { path: 'comment', component: ComentComponent },
    { path: 'information', component: InformationComponent },
    { path: 'update', component: UpdateComponent },
    { path: 'updatequestion', component: UpdateQuestionComponent },
    { path: 'message', component: MessageComponent },
    { path: 'notification', component: NotificationComponent },
    { path: 'tutorials', component: TutorialsComponent },
    { path: 'editexercice', component: EditExerciceComponent },
    { path: 'mesexercice', component: MesExerciceComponent },
    { path: 'exercice', component: ExerciceComponent },
    { path: 'addexercice', component: AddExerciceComponent },
    { path: 'calendar', component: CalendarComponent },
    {path: 'ajoutf', component: AjoutfComponent }
  ]
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
