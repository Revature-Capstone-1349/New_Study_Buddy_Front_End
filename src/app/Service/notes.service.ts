import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  subjectNotifer: Subject<void> = new Subject<void>();
  portNumber:number = 8080;
  private apiServerUrl = environment.apiBaseUrl 
  constructor(private http: HttpClient) {}

  notifyAboutChange(){
    this.subjectNotifer.next();
  }

 getNotes(): Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/api/Notes`);
  }

 getNotesById(id: any): Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/api/Notes/${id}`);
  }

 getNotesByUserId(id: any): Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/api/Notes/byUser/${id}`);
  }
 getNotesBySetId(id: any, user: any): Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/api/Notes/bySet/${id}/${user}`);
  }
 
  addNote(notes : any): Observable<any>{
    return this.http.post<any>(`${this.apiServerUrl}/api/Notes`, notes);
  }

  updateNote(notes: any): Observable<any>{
    return this.http.put<any>(`${this.apiServerUrl}/api/Notes`, notes);
  }

  getDeleteById(id: any): Observable<any>{
    return this.http.delete<any>(`${this.apiServerUrl}/api/Notes/${id}`);
  }

 
}
