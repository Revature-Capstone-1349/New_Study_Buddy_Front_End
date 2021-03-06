import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/Model/user';
import { SessionsService } from 'src/app/Service/sessions.service';
import { SetsService } from 'src/app/Service/sets.service';
import { UserDataService } from 'src/app/Service/user-data.service';

@Component({
  selector: 'app-sets',
  templateUrl: './sets.component.html',
  styleUrls: ['./sets.component.css']
})
export class SetsComponent implements OnInit {
  currentUser : User
  currentSet: any[] = []
  myBgColor: string = '#673ab7';
  myFontColor: string = '#ffc107';  
  defaultBgColor: string = '#ffc107';
  defaultFontColor: string = '#673ab7';
  notifierSubscription: Subscription = this.setsSession.subjectNotifier.subscribe(notified => {
    this.setsSession.setsByUserIdAndPublic(this.currentUser.userId).subscribe({
      next: (res) =>{
        this.currentSet = res
      }
    })
  });

  constructor(private setsSession: SetsService, private userSession: UserDataService, private session: SessionsService) {
      this.currentUser = session.getSession("userAccount")
   }

  ngOnInit(): void {
    this.currentUser = this.session.getSession("userAccount")
    this.setsSession.setsByUserIdAndPublic(this.currentUser.userId).subscribe({
      next: (res) =>{
        this.currentSet = res;
      }
    })
  }

}
