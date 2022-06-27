import { Component, Inject, OnInit, NgModule } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TimerService } from 'src/app/timer.service';
import { CreateTimerComponent } from '../create-timer/create-timer.component';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  break = false;
  showFiller = false;

  constructor(
    public timerService: TimerService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(CreateTimerComponent, {
      hasBackdrop: true,
      width: '500px'
    });
  }

}
