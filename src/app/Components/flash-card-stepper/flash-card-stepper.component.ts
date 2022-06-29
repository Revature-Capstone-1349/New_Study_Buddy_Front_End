import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddFlashCardComponent, ViewFlashCardsDialogComponent } from 'src/app/Pages/view-flash-cards/view-flash-cards.component';
import { FlashCardService } from 'src/app/Service/flash-card.service';
import { Subscription } from 'rxjs';
import { AddNotesComponent } from '../add-notes/add-notes.component';
import { SetsService } from 'src/app/Service/sets.service';

@Component({
  selector: 'app-flash-card-stepper',
  templateUrl: './flash-card-stepper.component.html',
  styleUrls: ['./flash-card-stepper.component.css']
})
export class FlashCardStepperComponent implements OnInit {

  setId: any;
  index : any;
  setName : any; // name of the set...

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
    private route: Router,
    private flashCardService: FlashCardService,
    private setService : SetsService
  ) {
    this.setId = this.activedRoute.snapshot.paramMap.get('setId');
    this.setService.setBySetId(this.setId).subscribe(response => { this.setName = response.setName }); // name of the set by the id
    this.index = this.activedRoute.snapshot.paramMap.get('cardIndex');
  }

  ngOnInit(): void {
    this.index = this.activedRoute.snapshot.paramMap.get('cardIndex');
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
previousCard(){
  if(this.index > 0){
    this.route.navigate([`view-flash-cards/${this.setId}/${--this.index}`])
  }
}
nextCard(){
  if(this.index < this.flashCardList.length-1){
    this.route.navigate([`view-flash-cards/${this.setId}/${++this.index}`])
  }
}

closeClick(){
  console.log("Close was clicked")
  this.route.navigate([`view-flash-cards/${this.setId}`])
}


openCreateNotesDialog():void{
  this.dialog.open(AddNotesComponent,{data:this.setId})
}

}
