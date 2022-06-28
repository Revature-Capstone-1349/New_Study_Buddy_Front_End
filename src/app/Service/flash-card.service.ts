import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FlashCardService {
  subjectNotifer: Subject<void> = new Subject<void>();
  //portNumber:number = 8080;
  private apiServerUrl = environment.apiBaseUrl 
  constructor(private http: HttpClient) { }

  notifyAboutChange(){
    this.subjectNotifer.next();
  }

  // all flashcards
  flashCardList(): Observable<any>{
    return this.http.get(`${this.apiServerUrl}/api/flashcards`);
  }

  // flash cards by setId
  flashCardBySetId(setId: number):Observable<any>{
    return this.http.get(`${this.apiServerUrl}/api/flashcards/getSet/${setId}`);
  }

  // flash card by fCardId
  flashCardByCardId(fCardId: number): Observable<any>{
    return this.http.get(`${this.apiServerUrl}/api/flashcards/${fCardId}`);
  }

  // add flash card by Flashcard object
  addFlashCard(flashcard: any): Observable<any>{
    return this.http.post(`${this.apiServerUrl}/api/flashcards`, flashcard);
  }

  // update flash card by Flashcard object
  updateFlashCard(flashcard: any): Observable<any>{
    return this.http.put(`${this.apiServerUrl}/api/flashcards`, flashcard);
  }

  // delete flash card by fCardId
  deleteFlashCardById(fCardId: number): Observable<any>{
    return this.http.delete(`${this.apiServerUrl}/api/flashcards/${fCardId}`);
  }

  // userId by flashcard setId
  getUserIdByfCardSetId(setId: number): Observable<any>{
    return this.http.get(`${this.apiServerUrl}/api/flashcards/getOwner/${setId}`)
  }
}
