import { Component, OnInit } from '@angular/core';
import { SessionsService } from 'src/app/Service/sessions.service';
import { DrawerService } from 'src/app/Service/drawer.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: any;
  logger: boolean = false;

  constructor(private sessionService: SessionsService, private drawerService: DrawerService) { }
            
  ngOnInit(): void {
    this.logger = this.sessionService.checkIfLogged();
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