import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { AddNotesComponent } from 'src/app/Components/add-notes/add-notes.component';
import { notes } from 'src/app/Model/notes';
import { User } from 'src/app/Model/user';
import { NotesService } from 'src/app/Service/notes.service';
import { SessionsService } from 'src/app/Service/sessions.service';
import { SetsService } from 'src/app/Service/sets.service';

@Component({
  selector: 'app-view-notes',
  templateUrl: './view-notes.component.html',
  styleUrls: ['./view-notes.component.css']
})
export class ViewNotesComponent implements OnInit {
  userId: number = 1
  user: User
  setIdSearch:number = -1;
  noteList : notes[] = []
  editModeOn = false;
  editList : boolean[] = [];
  setList: any[] =[]

  notifierSubscription: Subscription = this.setsSession.subjectNotifier.subscribe(notified => {
    this.setsSession.setsByUserIdAndPublic(this.user.userId).subscribe({
      next: (res) =>{
        this.setList = res
      } , error: (err) =>{
        this.snack.open("There are no sets", "Please make a set", {
          duration:5000
        })
      }
    })
  });

  constructor(
    private session: SessionsService,
    private noteService: NotesService,
    private snack: MatSnackBar,
    private dialog: Dialog,
    private setsSession: SetsService
  ) { 
    this.user = this.session.getSession("userAccount")
    console.log(this.user)
  }

  ngOnInit(): void {
    this.user = this.session.getSession("userAccount")

    if(this.setIdSearch == -1){
      this.noteService.getNotesByUserId(this.user.userId).subscribe(response => {
        this.noteList  = response
      })
    }
    else{
      this.noteService.getNotesBySetId(this.setIdSearch,this.user.userId).subscribe({
        next: (response)=>{
        this.noteList  = response
      }, error: (err) =>{
        this.snack.open("There are notes for this set", "Please study", {
          duration:5000
        })
      }})
    }

    this.noteList.forEach(element => {
      this.editList.push(false)
    });

    this.setsSession.setsByUserIdAndPublic(this.user.userId).subscribe({
      next: (res) =>{
        this.setList = res
      }
    })

  }

  ToggleEdit(id:number){
    this.editList[id] = !this.editList[id]
    if(this.setIdSearch == -1){
      this.noteService.getNotesByUserId(this.user.userId).subscribe(response => {
        this.noteList  = response
      })
    }
    else{
      this.noteService.getNotesBySetId(this.setIdSearch,this.user.userId).subscribe({
        next: (response)=>{
        this.noteList  = response
      }, error: (err) =>{
        this.snack.open("There are notes for this set", "Please study", {
          duration:5000
        })
      }})

    }
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
    if(this.setIdSearch ==-1){
      this.noteService.getNotesByUserId(this.user.userId).subscribe(response => {
        this.noteList  = response
      })
    }
    else{
      this.noteService.getNotesBySetId(this.setIdSearch,this.user.userId).subscribe({
        next: (response)=>{
        this.noteList  = response
      }, error: (err) =>{
        this.snack.open("There are notes for this set", "Please study", {
          duration:5000
        })
      }})

    }
  })

  openCreateNotesDialog():void{
    this.dialog.open(AddNotesComponent,{})
  }

  setSearch(search:any){
    this.setIdSearch = search
   if(search == -1){

    this.noteService.getNotesByUserId(this.user.userId).subscribe(response => {
      this.noteList  = response
    });

   }
   else{

    this.noteService.getNotesBySetId(this.setIdSearch,this.user.userId).subscribe({
      next: (response)=>{
      this.noteList  = response
    }, error: (err) =>{
      this.snack.open("There are notes for this set", "Please study", {
        duration:5000
      })
    }})

   }
  }
  

}
