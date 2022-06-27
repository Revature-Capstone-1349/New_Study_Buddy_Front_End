import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetsService {
  subjectNotifier: Subject<void> = new Subject<void>();
  portNumber:number = 8080;

  constructor(private http: HttpClient) { }

  notifyAboutChange() {
    this.subjectNotifier.next();
  }

  // all public and user sets by userId
  setsByUserIdAndPublic(userId: any): Observable<any>{
    return this.http.get(`http://localhost:${this.portNumber}/api/Sets/publicSet/${userId}`);
  }

  // add Set by Sets object
  addSet(sets: any): Observable<any>{
    return this.http.post(`http://localhost:${this.portNumber}/api/Sets`, sets);
  }

  // set by setId
  setBySetId(setId: number): Observable<any>{
    return this.http.get(`http://localhost:${this.portNumber}/api/Sets/${setId}`);
  }

  // update set by Sets object
  updateSet(sets: any): Observable<any>{
    return this.http.put(`http://localhost:${this.portNumber}/api/Sets`, sets)
  }

  // delete by setId
  deleteBySetId(setId: number): Observable<any>{
    return this.http.delete(`http://localhost:${this.portNumber}/api/Sets/${setId}`);
  }

  // all sets
  allSets(): Observable<any>{
    return this.http.get(`http://localhost:${this.portNumber}/api/Sets/listSets`);
  }
}
