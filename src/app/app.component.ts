import { Component } from '@angular/core';
import { DrawerService } from './Service/drawer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private drawerService: DrawerService){}

  public get hideDrawer():boolean{
    return this.drawerService.isExpanded;
  }
}
