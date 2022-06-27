import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { User } from 'src/app/Model/user';
import { UserDataService } from 'src/app/Service/user-data.service';

import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hidePass = true;
  user = new User();
  display = false;
  registerStatus: boolean = false;

  constructor(
    private userDataService: UserDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
  }

  onSubmitHandler(){
     if (this.user.name !== undefined
      || this.user.email !== undefined 
      || this.user.passwd !== undefined){
        this.userDataService.register(this.user).subscribe(response => {
          this.registerStatus = response;
          if (response){
            this.router.navigateByUrl("/login");
          }
          else {
              this.display=true;
            }
        });
      }
  }
}