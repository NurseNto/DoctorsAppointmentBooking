import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:4200';

  constructor(private http: HttpClient) { }

  register(patient: Patient): Observable<any> {
    return this.http.post(`${this.apiUrl}/patients`, patient);
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/patient/auth`, credentials);
  }

}
