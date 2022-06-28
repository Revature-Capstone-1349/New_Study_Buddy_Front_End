import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { AddNotesComponent } from 'src/app/Components/add-notes/add-notes.component';
import { notes } from 'src/app/Model/notes';
import { User } from 'src/app/Model/user';
import { NotesService } from 'src/app/Service/notes.service';
import { SessionsService } from 'src/app/Service/sessions.service';

@Component({
  selector: 'app-view-notes',
  templateUrl: './view-notes.component.html',
  styleUrls: ['./view-notes.component.css']
})
export class ViewNotesComponent implements OnInit {
  userId: number = 1
  user: User
  noteList : notes[] = []
  editModeOn = false;
  editList : boolean[] = [];

  constructor(
    private session: SessionsService,
    private noteService: NotesService,
    private snack: MatSnackBar,
    private dialog: Dialog
  ) { 
    this.user = this.session.getSession("userAccount")
  }

  ngOnInit(): void {
    this.user = this.session.getSession("userAccount")
    this.noteService.getNotesByUserId(this.user.userId).subscribe(response => {
      this.noteList  = response
    })

    this.noteList.forEach(element => {
      this.editList.push(false)
    });
  }

  ToggleEdit(id:number){
    this.editList[id] = !this.editList[id]
    this.noteService.getNotesByUserId(this.user.userId).subscribe(response => {
      this.noteList  = response
    })
  }

  ngSubmitHandler(index:any){
    this.editList[index] = !this.editList[index]
    console.log("Note to be saved is " + this.noteList[index])
    this.noteService.updateNote(this.noteList[index]).subscribe(response => {
      this.snack.open("Edit is .......", "Saved",{
        duration: 5000
      })
    })

  }

  onTrashClicked(id:any, index:number){
    this.editList[index] = !this.editList[index]
    console.log("Note to be deleted is " + this.noteList[index])

    this.noteService.getDeleteById(id).subscribe(response =>{
      this.snack.open("The note has been .......", "Deleted",{
        duration: 5000
      })
      this.noteService.notifyAboutChange();
    })

  }

  notifierSubScription: Subscription = this.noteService.subjectNotifer.subscribe( notified =>{
    this.noteService.getNotesByUserId(this.user.userId).subscribe(response => {
      this.noteList  = response
    })
  })

  openCreateNotesDialog():void{
    this.dialog.open(AddNotesComponent,{})
  }

}
