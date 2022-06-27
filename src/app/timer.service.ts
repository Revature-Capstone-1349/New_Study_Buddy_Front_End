import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class TimerService {

  public title = "Study Timer";

  private break: boolean = false;
  
  initTimer = new Time(0, 50, 0);
  studyTimer = new Time (0, 50, 0);
  breakTimer = new Time(0, 10, 0);

  private timer: any;
  private date = new Date();

  public disabled: boolean = false;


  constructor(public _snackBar: MatSnackBar){ }

  ngOnInit() {
    (this.initTimer.hours === 0 && this.initTimer.minutes === 0 && this.initTimer.seconds === 0)? this.disabled = true : this.disabled = false;
  }

  setTimer(hours: number, minutes: number, seconds: number) {
    this.initTimer.setTime(hours, minutes, seconds);
  }

  updateTimer() {
    this.date.setHours(this.initTimer.getHours());
    this.date.setMinutes(this.initTimer.getMinutes());
    this.date.setSeconds(this.initTimer.getSeconds());
    this.date.setMilliseconds(0);
    
    const time = this.date.getTime();
    
    this.date.setTime(time - 1000);

    this.initTimer.setTime(this.date.getHours(), this.date.getMinutes(), this.date.getSeconds());

    if (this.date.getHours() === 0 &&
      this.date.getMinutes() === 0 &&
      this.date.getSeconds() === 0) {
      clearInterval(this.timer); //stop interval
     
      setTimeout(() => {
        this.stop();
      
      }, 0);

    }
  }

  start() {
    if (this.initTimer.getHours() > 0 || this.initTimer.getMinutes() > 0 || this.initTimer.getSeconds() > 0) {
      this.disabled = true;
      this.updateTimer();

      if(this.initTimer.getSeconds() > 0){
        this.timer = setInterval(() => {
          this.updateTimer();
        }, 1000);
      }     
    }
  }
 
  stop() {    
    this.disabled = false;
    clearInterval(this.timer);
    this.breakTime();
  }
  
  breakTime(){
    if (this.initTimer.getHours() === 0 && this.initTimer.getMinutes() === 0 && this.initTimer.getSeconds() === 0 &&
        this.break === false) {
        this.break = true;
        this.title = "Snack Break";
        this.setTimer(this.breakTimer.getHours(), this.breakTimer.getMinutes(), this.breakTimer.getSeconds());
        this._snackBar.open("You've made it to break time", "Enjoy!",{
          duration: 5000
        });

        this.start();
    } else if (this.initTimer.getHours() === 0 && this.initTimer.getMinutes() === 0 && this.initTimer.getSeconds() === 0 &&
        this.break === true) {
        this.break = false;
        this.title = "Study Timer";
        this.setTimer(this.studyTimer.getHours(), this.studyTimer.getMinutes(), this.studyTimer.getSeconds());
        this._snackBar.open("Break is over, lets continue", "You can do it!", {
          duration: 5000
        });
      
        this.start();
    }
  }
}

class Time {
  constructor(
    public hours: number,
    public minutes: number,
    public seconds: number
  ){}

  getHours(): number{
    return this.hours;
  }

  getMinutes(): number{
    return this.minutes;
  }

  getSeconds(): number{
    return this.seconds;
  }

  setHours(h: number){
    (h >= 0 && h <= 59)? this.hours = h : (h < 0)? this.hours = 0 : (h > 59)? this.hours = 59 : (h === undefined || h === null)? this.hours = 0 : "";
  }
  setMinutes(m: number){
    (m >= 0 && m <= 59)? this.minutes = m : (m < 0)? this.minutes = 0 : (m > 59)? this.minutes = 59 : (m === undefined || m === null)? this.minutes = 0 : "";
  }
  setSeconds(s: number){
    (s >= 0 && s <= 59)? this.seconds = s : (s < 0)? this.seconds = 0 : (s > 59)? this.seconds = 59 : (s === undefined || s === null)? this.seconds = 0 : "";
  }


  setTime(h: number, m: number, s: number){
    (h >= 0 && h <= 59)? this.hours = h : (h < 0)? this.hours = 0 : (h > 59)? this.hours = 59 : (h === undefined || h === null)? this.hours = 0 : "";
    (m >= 0 && m <= 59)? this.minutes = m : (m < 0)? this.minutes = 0 : (m > 59)? this.minutes = 59 : (m === undefined || m === null)? this.minutes = 0 : "";
    (s >= 0 && s <= 59)? this.seconds = s : (s < 0)? this.seconds = 0 : (s > 59)? this.seconds = 59 : (s === undefined || s === null)? this.seconds = 0 : "";
  }
}