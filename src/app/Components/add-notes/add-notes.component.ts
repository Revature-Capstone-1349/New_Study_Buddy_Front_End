import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { notes } from 'src/app/Model/notes';
import { User } from 'src/app/Model/user';
import { NotesService } from 'src/app/Service/notes.service';
import { SessionsService } from 'src/app/Service/sessions.service';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.css']
})
export class AddNotesComponent implements OnInit {

  note = new notes()
  user : User

  constructor(
    private session: SessionsService,
    private noteService: NotesService,
    private snack: MatSnackBar
    ) {
      this.user = session.userAccount
      console.log(this.user)
     }

  ngOnInit(): void {
    this.user = this.session.getSession("userAccount")
  }
//Add a onclick function for creating the note
onSubmitHandler(){
  console.log("Form was submitted");
  // console.log()
  console.log(this.user.userId);
  this.note.userId = this.user.userId
  console.log(this.note)
  this.noteService.addNote(this.note).subscribe(response =>{
    console.log(response)
    this.snack.open("Your note has been......", "Created", {
      duration : 5000
    })
  })
  
}
}
