import { flashcards } from 'src/app/Model/flashcards';
import { Component, Inject, OnInit } from '@angular/core';
import { Dialog, DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { ActivatedRoute } from '@angular/router';
import { FlashCardService } from 'src/app/Service/flash-card.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-view-flash-cards',
  templateUrl: './view-flash-cards.component.html',
  styleUrls: ['./view-flash-cards.component.css']
})
export class ViewFlashCardsComponent implements OnInit {
  setId: any;

  // Flash Card Dummy Data
  flashCardList: any[] = []
  notifierSubscription: Subscription = this.flashCardService.subjectNotifer.subscribe(notifed =>{
    this.flashCardService.flashCardBySetId(this.setId).subscribe({
      next: (res) =>{
        this.flashCardList = res
      }
    })
  })
  constructor(
    private dialog: Dialog,
    private activedRoute: ActivatedRoute,
    private flashCardService: FlashCardService
  ) {
    this.setId = this.activedRoute.snapshot.paramMap.get('setId');
  }

  ngOnInit(): void {
    this.flashCardService.flashCardBySetId(this.setId).subscribe({
      next: (res) =>{
        this.flashCardList = res
      }
    })
  }
  openDialog(def: string): void {
    this.dialog.open(ViewFlashCardsDialogComponent, {
      data: def
    })
  }
  openCreateFlashCardDialog(): void {
    this.dialog.open(AddFlashCardComponent, {
      width: '400px',
      data: this.setId
    })
  }


}

@Component({
  selector: 'app-view-flash-cards-dialog',
  templateUrl: './view-flash-cards-dialog.component.html',
  styleUrls: ['./view-flash-cards-dialog.component.css']
})
export class ViewFlashCardsDialogComponent implements OnInit {

  constructor(
    public dialogRef: DialogRef<ViewFlashCardsDialogComponent>,
    @Inject(DIALOG_DATA) public dialogData: any,
  ) {
    console.log(dialogData)
  }

  ngOnInit(): void {
  }
}

@Component({
  selector: 'app-add-flash-card',
  templateUrl: './add-flash-card.component.html',
  styleUrls: ['./add-flash-card.component.css']
})
export class AddFlashCardComponent implements OnInit {
  cardItem: flashcards = new flashcards();

  constructor(
    public dialogRef: DialogRef<ViewFlashCardsComponent>,
    @Inject(DIALOG_DATA) public dialogData: any,
    private flashCardService: FlashCardService
  ) { }

  ngOnInit(): void {
  }
  onSubmitHandler() {
    this.cardItem.setId = this.dialogData;
    this.flashCardService.addFlashCard(this.cardItem).subscribe({
      next: (res) => {
        this.dialogRef.close()
      },
      error: (err) => {
        console.log(err);

      },
      complete: () =>{
        this.flashCardService.notifyAboutChange();
      }
    })



  }
}

