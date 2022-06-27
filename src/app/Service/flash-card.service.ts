import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlashCardService {
  subjectNotifer: Subject<void> = new Subject<void>();
  portNumber:number = 8080;

  constructor(private http: HttpClient) { }

  notifyAboutChange(){
    this.subjectNotifer.next();
  }

  // all flashcards
  flashCardList(): Observable<any>{
    return this.http.get(`http://localhost:${this.portNumber}/api/flashcards`);
  }

  // flash cards by setId
  flashCardBySetId(setId: number):Observable<any>{
    return this.http.get(`http://localhost:${this.portNumber}/api/flashcards/getSet/${setId}`);
  }

  // flash card by fCardId
  flashCardByCardId(fCardId: number): Observable<any>{
    return this.http.get(`http://localhost:${this.portNumber}/api/flashcards/${fCardId}`);
  }

  // add flash card by Flashcard object
  addFlashCard(flashcard: any): Observable<any>{
    return this.http.post(`http://localhost:${this.portNumber}/api/flashcards`, flashcard);
  }

  // update flash card by Flashcard object
  updateFlashCard(flashcard: any): Observable<any>{
    return this.http.put(`http://localhost:${this.portNumber}/api/flashcards`, flashcard);
  }

  // delete flash card by fCardId
  deleteFlashCardById(fCardId: number): Observable<any>{
    return this.http.delete(`http://localhost:${this.portNumber}/api/flashcards/getSet/${fCardId}`);
  }
}
