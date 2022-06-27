import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor( private http: HttpClient ) { }

  register(data: any ): Observable<any> {
    return this.http.post('http://localhost:8080/api/users/add', data);
  }

  login(data: any ): Observable<any> {
    return this.http.post('http://localhost:8080/api/users/finduser', data);
  }
}
