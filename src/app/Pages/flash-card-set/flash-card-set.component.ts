import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { Sets } from 'src/app/Model/sets';
import { User } from 'src/app/Model/user';
import { SessionsService } from 'src/app/Service/sessions.service';
import { SetsService } from 'src/app/Service/sets.service';

@Component({
  selector: 'app-flash-card-set',
  templateUrl: './flash-card-set.component.html',
  styleUrls: ['./flash-card-set.component.css']
})
export class FlashCardSetComponent implements OnInit {

  user: User

  constructor(
    public dialog: Dialog, 
    private session: SessionsService
    ) {
    this.user = this.session.getSession("userAccount")
  }

  ngOnInit(): void {
  }

  openCreateSetDialog(): void {
    this.dialog.open(AddSetComponentDialog)
  }

}


@Component({
  selector: 'add-set',
  templateUrl: './add-set.component.html',
  styleUrls: ['./add-set.component.css']
})
export class AddSetComponentDialog implements OnInit {
  setItem: Sets = new Sets();
  privacy: boolean = false;
  setAdded: boolean = true;
  userId: number = 1;

  ngOnInit(): void {
  }
  user : User

  constructor(
    public dialogRef: DialogRef<AddSetComponentDialog>,
    private setService: SetsService,
    private session: SessionsService
  ) {
    this.user = this.session.getSession("userAccount")
    console.log("This user is " + this.user.userId)
    // async () => {
      // this.user = await this.session.getSession("userAccount")
      // console.log(this.user)
      this.setItem = new Sets(this.user.userId);
    // };
  }

  addSetFormHandler(): void {
    this.setItem.privacy = this.privacy ? 'public' : 'private';
    console.log(this.setItem)
    if (this.setItem.setName != undefined) {
      this.setService.addSet(this.setItem).subscribe({
        next: (res) => {
          this.dialogRef.close();
          console.log(this.setAdded);
        },
        error: (err) => {
          this.setAdded = false;
        },
        complete: () => {
          this.setService.notifyAboutChange();
        }
      });

    }

  }
}
