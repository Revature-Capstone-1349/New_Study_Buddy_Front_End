import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Model/user';
import { SessionsService } from 'src/app/Service/sessions.service';
import { UserDataService } from 'src/app/Service/user-data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hidePass = true;
  user: User = new User();
  display = false;
  logger: boolean = false;

  constructor(
    private userDataService: UserDataService,
    private sessionService: SessionsService
  ) { }

  ngOnInit(): void {
    this.sessionService.pagePreventor();
  }


  login() {
    this.userDataService.login(this.user).subscribe(response => {

      if (response !== null) {
        this.sessionService.createSession("userAccount", response)
        this.user = this.sessionService.getSession("userAccount")
        console.log(this.user);
        this.sessionService.redirectThanReload("");
      } else {
        this.display = true;
      }

    })

  }

}
