import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private apiServerUrl = environment.apiBaseUrl

  constructor( private http: HttpClient ) { }

  register(data: any ): Observable<any> {
    return this.http.post(`${this.apiServerUrl}/api/users/add`, data);
  }

  login(data: any ): Observable<any> {
    return this.http.post(`${this.apiServerUrl}/api/users/finduser`, data);
  }
}
