import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { EtudiantComponent } from './etudiant/etudiant.component';
import { InformationComponent } from './information/information.component';
import { UpdateComponent } from './update/update.component';
import { QuestionComponent } from './question/question.component';
import { ComentComponent } from './coment/coment.component';
import { MesQuestionsComponent } from './mes-questions/mes-questions.component';
import { UpdateQuestionComponent } from './update-question/update-question.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import { MatListModule } from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SearchPipe } from './search.pipe';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; 
import interactionPlugin from '@fullcalendar/interaction';
import {ScheduleModule, RecurrenceEditorModule, DayService ,WeekService,MonthService,WorkWeekService,AgendaService,TimelineViewsService,TimelineMonthService} from '@syncfusion/ej2-angular-schedule'
import {DropDownListModule}from '@syncfusion/ej2-angular-dropdowns'
import {DateTimePickerModule}from '@syncfusion/ej2-angular-calendars';
import { CourseComponent } from './course/course.component';
import { AddCoursComponent } from './add-cours/add-cours.component';
import { EditCoursComponent } from './edit-cours/edit-cours.component';
import { MesCoursComponent } from './mes-cours/mes-cours.component';
import { MessageComponent } from './message/message.component';
import { NotificationComponent } from './notification/notification.component';
import { TutorialsComponent } from './tutorials/tutorials.component';
import { ListEtudiantComponent } from './list-etudiant/list-etudiant.component' 
import { CustomFormsModule } from 'ngx-custom-validators';
import { ExerciceComponent } from './exercice/exercice.component';
import { AddExerciceComponent } from './add-exercice/add-exercice.component';
import { EditExerciceComponent } from './edit-exercice/edit-exercice.component';
import { MesExerciceComponent } from './mes-exercice/mes-exercice.component';
import { CalendarComponent } from './calendar/calendar.component';

import {SocketIoModule} from "ngx-socket-io";
import { from } from 'rxjs';
import { FormationComponent } from './formation/formation.component';
import { AjoutfComponent } from './ajoutf/ajoutf.component';
import { AddExerciceEComponent } from './add-exercice-e/add-exercice-e.component';
import { CommentEComponent } from './comment-e/comment-e.component';
import { CoursEComponent } from './cours-e/cours-e.component';
import { EnseignantComponent } from './enseignant/enseignant.component';
import { ExercicebComponent } from './exerciceb/exerciceb.component';
import { InformationEComponent } from './information-e/information-e.component';
import { ListEnseignantComponent } from './list-enseignant/list-enseignant.component';
import { PdfComponent } from './pdf/pdf.component';
import { QuestionEComponent } from './question-e/question-e.component';
FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    EtudiantComponent,
    InformationComponent,
    UpdateComponent,
    QuestionComponent,
    ComentComponent,
    MesQuestionsComponent,
    UpdateQuestionComponent,
    SearchPipe,
    CourseComponent,
    AddCoursComponent,
    EditCoursComponent,
    MesCoursComponent,
    MessageComponent,
    NotificationComponent,
    TutorialsComponent,
    ListEtudiantComponent,
    ExerciceComponent,
    AddExerciceComponent,
    EditExerciceComponent,
    MesExerciceComponent,
    CalendarComponent,
    FormationComponent,
    AjoutfComponent,
    AddExerciceEComponent,
    CommentEComponent,
    CoursEComponent,
    EnseignantComponent,
    ExercicebComponent,
    InformationEComponent,
    ListEnseignantComponent,
    PdfComponent,
    QuestionEComponent,
   
    
    
  ],
  imports: [MatSnackBarModule,
    FullCalendarModule,
    
  
    CustomFormsModule,
    
    DropDownListModule,
    ScheduleModule,
    DateTimePickerModule,
     RecurrenceEditorModule,
    MatSidenavModule,
    MatTabsModule,
    MatListModule,
    MatStepperModule,
    MatChipsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    NgxPaginationModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SocketIoModule.forRoot({
      url: '/'
    })
  ],
  providers: [DayService ,WeekService,MonthService,WorkWeekService,AgendaService,TimelineViewsService,TimelineMonthService],
  bootstrap: [AppComponent],
  entryComponents:[UpdateComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
