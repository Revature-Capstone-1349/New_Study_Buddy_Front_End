import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SessionsService } from 'src/app/Service/sessions.service';
import { Router } from '@angular/router';
import { HttpBackend } from '@angular/common/http';
import { DrawerService } from 'src/app/Service/drawer.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: any;
  logger: boolean = false;
  call = this.checkLogger();

  constructor(private sessionService: SessionsService, private drawerService: DrawerService) { }
            
  ngOnInit(): void {
    this.checkLogger()
  }

  checkLogger(){
    if(this.sessionService.checkLoggedInActive()){
      this.user = this.sessionService.getSession("userAccount")
    }else
    this.logger = false
  }

  onClickLogout(){
    this.sessionService.logout();
  }

  public get hideDrawer(): boolean{
    return this.drawerService.isExpanded;
  }

  public set hideDrawer(value: boolean){
    this.drawerService.isExpanded = value;
  }
  
}