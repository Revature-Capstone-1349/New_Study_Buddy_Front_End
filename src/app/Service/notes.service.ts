import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  portNumber:number = 8080;

  constructor(private http: HttpClient) {}

 getNotes(): Observable<any>{
    return this.http.get<any>("http://localhost:8080/api/Notes");
  }

 getNotesById(id: any): Observable<any>{
    return this.http.get<any>(`http://localhost:8080/api/Notes/${id}`);
  }

 getNotesByUserId(id: any): Observable<any>{
    return this.http.get<any>(`http://localhost:8080/api/Notes/byUser/${id}`);
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
