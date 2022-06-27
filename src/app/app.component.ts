import { Component } from '@angular/core';
import { DrawerService } from './Service/drawer.service';
import { SessionsService } from './Service/sessions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  logger: boolean = false;

  constructor(
    private drawerService: DrawerService,
    private sessionService: SessionsService
  ) {
    this.logger = this.sessionService.checkIfLogged();
  }

  public get hideDrawer(): boolean {
    return this.drawerService.isExpanded;
  }
}
