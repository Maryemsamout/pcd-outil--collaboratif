import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../Services/service.service'
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @Input() idO!:number;
  constructor(private api:ServiceService) { }
calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth'
  }

  ngOnInit(): void {
  }

}
