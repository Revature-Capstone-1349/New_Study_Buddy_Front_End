import { Component, OnInit } from '@angular/core';
import { SessionsService } from 'src/app/Service/sessions.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logger : any;
  constructor(private sessionService : SessionsService) { }

  ngOnInit(): void {
    this.logger = this.sessionService.checkIfLogged();
  }

}
