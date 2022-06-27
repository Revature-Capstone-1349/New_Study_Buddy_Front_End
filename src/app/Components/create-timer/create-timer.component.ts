import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TimerService } from 'src/app/timer.service';
import { TimerComponent } from '../timer/timer.component';

@Component({
  selector: 'app-create-timer',
  templateUrl: './create-timer.component.html',
  styleUrls: ['./create-timer.component.css']

})
export class CreateTimerComponent implements OnInit {

    constructor(public timerService: TimerService,
      public dialogRef: MatDialogRef<TimerComponent>, 
      ) { }

  ngOnInit(): void {
  }

  saveTimer(){ 
    (this.timerService.studyTimer.hours < 0)? this.timerService.studyTimer.hours = 0 : (this.timerService.studyTimer.hours > 59)? this.timerService.studyTimer.hours = 59 : (this.timerService.studyTimer.hours === null || this.timerService.studyTimer.hours === undefined)? this.timerService.studyTimer.hours = 0 : "";
    (this.timerService.studyTimer.minutes < 0)? this.timerService.studyTimer.minutes = 0 : (this.timerService.studyTimer.minutes > 59)? this.timerService.studyTimer.minutes = 59 : (this.timerService.studyTimer.minutes === null)? this.timerService.studyTimer.minutes = 0 : "";
    (this.timerService.studyTimer.seconds < 0)? this.timerService.studyTimer.seconds = 0 : (this.timerService.studyTimer.seconds > 59)? this.timerService.studyTimer.seconds = 59 : (this.timerService.studyTimer.seconds === null)? this.timerService.studyTimer.seconds = 0 : "";  
    
    (this.timerService.breakTimer.hours < 0)? this.timerService.breakTimer.hours = 0 : (this.timerService.breakTimer.hours > 59)? this.timerService.breakTimer.hours = 59 : (this.timerService.breakTimer.hours === null || this.timerService.breakTimer.hours === undefined)? this.timerService.breakTimer.hours = 0 : "";
    (this.timerService.breakTimer.minutes < 0)? this.timerService.breakTimer.minutes = 0 : (this.timerService.breakTimer.minutes > 59)? this.timerService.breakTimer.minutes = 59 : (this.timerService.breakTimer.minutes === null)? this.timerService.breakTimer.minutes = 0 : "";
    (this.timerService.breakTimer.seconds < 0)? this.timerService.breakTimer.seconds = 0 : (this.timerService.breakTimer.seconds > 59)? this.timerService.breakTimer.seconds = 59 : (this.timerService.breakTimer.seconds === null)? this.timerService.breakTimer.seconds = 0 : "";  
    
    this.timerService.initTimer.setTime(this.timerService.studyTimer.hours, this.timerService.studyTimer.minutes, this.timerService.studyTimer.seconds)
    this.dialogRef.close();
   }

}
