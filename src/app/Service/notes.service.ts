import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  subjectNotifer: Subject<void> = new Subject<void>();
  portNumber:number = 8080;

  constructor(private http: HttpClient) {}

  notifyAboutChange(){
    this.subjectNotifer.next();
  }

 getNotes(): Observable<any>{
    return this.http.get<any>("http://localhost:8080/api/Notes");
  }

 getNotesById(id: any): Observable<any>{
    return this.http.get<any>(`http://localhost:8080/api/Notes/${id}`);
  }

 getNotesByUserId(id: any): Observable<any>{
    return this.http.get<any>(`http://localhost:8080/api/Notes/byUser/${id}`);
  }
 getNotesBySetId(id: any, user: any): Observable<any>{
    return this.http.get<any>(`http://localhost:8080/api/Notes/bySet/${id}/${user}`);
  }
 
  addNote(notes : any): Observable<any>{
    return this.http.post<any>("http://localhost:8080/api/Notes", notes);
  }

  updateNote(notes: any): Observable<any>{
    return this.http.put<any>("http://localhost:8080/api/Notes", notes);
  }

  getDeleteById(id: any): Observable<any>{
    return this.http.delete<any>(`http://localhost:8080/api/Notes/${id}`);
  }

 
}
