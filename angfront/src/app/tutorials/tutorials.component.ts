import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutorials',
  templateUrl: './tutorials.component.html',
  styleUrls: ['./tutorials.component.css']
})
export class TutorialsComponent implements OnInit {

  @Input() idO!:number;

  constructor() { }

  videoIcon:string = "./assets/images/play.png";
  play:string = "Play";
  videodisabled:boolean = true;
  ngOnInit(): void {
  }
  changeImg(){
    if(this.play == "Play")
    {
      this.play = "Pause",
      this.videoIcon = "./assets/images/pause.png",
      this.videodisabled = false
    }
    else
    {
      this.videoIcon = "./assets/images/play.png",
      this.play = "Play",
      this.videodisabled = true
    }
  }
}
