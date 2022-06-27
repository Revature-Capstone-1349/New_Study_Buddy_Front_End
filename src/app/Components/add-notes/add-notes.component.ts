import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { notes } from 'src/app/Model/notes';
import { User } from 'src/app/Model/user';
import { ViewFlashCardsComponent } from 'src/app/Pages/view-flash-cards/view-flash-cards.component';
import { FlashCardService } from 'src/app/Service/flash-card.service';
import { NotesService } from 'src/app/Service/notes.service';
import { SessionsService } from 'src/app/Service/sessions.service';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.css']
})
export class AddNotesComponent implements OnInit {

  note = new notes()
  user: User

  constructor(
    private session: SessionsService,
    private noteService: NotesService,
    private snack: MatSnackBar,
    public dialogRef: DialogRef<ViewFlashCardsComponent>,
    public flashcardService: FlashCardService
  ) {
    this.user = session.getSession('userAccount')
  }

  ngOnInit(): void {
    this.user = this.session.getSession("userAccount")
  }


  onSubmitHandler() {
    this.note.userId = this.user.userId
    this.noteService.addNote(this.note).subscribe({
      next: (res) => {
        this.flashcardService.notifyAboutChange();
      },
      complete: () =>{
        this.dialogRef.close();
        this.snack.open("Your note has been......", "Created", {
          duration: 3000
        })
        window.location.reload();
      }
    })

  }

  closeDialog() {
    this.dialogRef.close()
  }
}
